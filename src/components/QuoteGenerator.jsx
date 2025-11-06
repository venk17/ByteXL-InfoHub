import { useState, useEffect } from 'react';
import axios from 'axios';
import { Quote, RefreshCw, AlertCircle, Heart } from 'lucide-react';

function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError('');
    setLiked(false);
    
    try {
      const response = await axios.get('https://bytexl-infohub-sqg1.onrender.com/api/quote');
      setQuote(response.data);
    } catch (error) {
      console.error('Quote fetch error:', error);
      setError(error.response?.data?.error || 'Failed to fetch quote');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Loading inspirational quote...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchQuote}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Inspiration</h2>
        <p className="text-gray-600">Get motivated with inspirational quotes</p>
      </div>

      {quote && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-8 mb-6">
          <div className="flex items-start space-x-4">
            <Quote className="h-8 w-8 text-purple-500 flex-shrink-0 mt-2" />
            <div className="flex-1">
              <blockquote className="text-xl font-medium text-gray-900 leading-relaxed mb-4">
                "{quote.text}"
              </blockquote>
              <cite className="text-lg text-purple-600 font-semibold not-italic">
                — {quote.author}
              </cite>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleLike}
          className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            liked
              ? 'bg-red-100 text-red-600 border border-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          <Heart 
            size={16} 
            className={liked ? 'fill-current' : ''} 
          />
          <span>{liked ? 'Liked!' : 'Like'}</span>
        </button>

        <button
          onClick={fetchQuote}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <RefreshCw size={16} />
          <span>New Quote</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <Quote size={14} />
          <span>Share positivity, spread inspiration</span>
        </div>
      </div>
    </div>
  );
}

export default QuoteGenerator;