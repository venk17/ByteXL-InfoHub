import { useState, useEffect } from 'react';
import axios from 'axios';
import { Thermometer, Droplets, Wind, RefreshCw, AlertCircle, MapPin } from 'lucide-react';

function WeatherModule() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get('/api/weather');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setError(error.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Weather</h2>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <MapPin size={16} />
          <span>{weatherData.city}, {weatherData.country}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold mb-1">{weatherData.temperature}°C</div>
            <div className="text-blue-100 capitalize">{weatherData.description}</div>
          </div>
          <div className="text-right">
            {weatherData.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
                className="w-16 h-16"
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="text-lg font-semibold text-gray-900">{weatherData.humidity}%</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Wind className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Wind Speed</div>
          <div className="text-lg font-semibold text-gray-900">{weatherData.windSpeed} m/s</div>
        </div>
      </div>

      <button
        onClick={fetchWeather}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <RefreshCw size={16} />
        <span>Refresh Weather</span>
      </button>
    </div>
  );
}

export default WeatherModule;