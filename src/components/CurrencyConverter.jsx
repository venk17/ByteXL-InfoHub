import { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, RefreshCw, AlertCircle, TrendingUp } from 'lucide-react';

function CurrencyConverter() {
  const [amount, setAmount] = useState('1000');
  const [conversionData, setConversionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConversion = async (amountToConvert) => {
    if (!amountToConvert || amountToConvert <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/currency?amount=${amountToConvert}`);
      setConversionData(response.data);
    } catch (error) {
      console.error('Currency conversion error:', error);
      setError(error.response?.data?.error || 'Failed to fetch conversion rates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchConversion(parseFloat(amount));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    
    // Auto-convert if amount is valid
    if (value && parseFloat(value) > 0) {
      const debounceTimer = setTimeout(() => {
        fetchConversion(parseFloat(value));
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  };

  useEffect(() => {
    // Initial conversion
    fetchConversion(1000);
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Currency Converter</h2>
        <p className="text-gray-600">Convert Indian Rupees (INR) to USD and EUR</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-3">
          <div className="flex-1">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount in INR
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? <RefreshCw className="animate-spin h-5 w-5" /> : 'Convert'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {conversionData && !isLoading && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900">₹ {conversionData.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Indian Rupees</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">USD</span>
                </div>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-900 mb-1">
                $ {conversionData.conversions.USD.toLocaleString()}
              </div>
              <div className="text-xs text-green-600">
                Rate: 1 INR = $ {conversionData.rates.USD}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">€</span>
                  <span className="font-medium text-blue-800">EUR</span>
                </div>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">
                € {conversionData.conversions.EUR.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600">
                Rate: 1 INR = € {conversionData.rates.EUR}
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            Exchange rates are updated in real-time
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;