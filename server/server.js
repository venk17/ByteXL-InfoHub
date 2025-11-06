const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample quotes data
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  }
];

// Routes

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY || "66778210e9e889bfd405fe01b9ddefd8";
    if (!apiKey) {
      return res.status(500).json({ 
        error: "Weather API key not configured. Please add WEATHER_API_KEY to your .env file." 
      });
    }

    // Default city - you can modify this or make it dynamic
    const city = 'London';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ 
      error: "Could not fetch weather data. Please check your API key and try again." 
    });
  }
});

// Currency API endpoint
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    
    if (amount <= 0) {
      return res.status(400).json({ 
        error: "Please provide a valid positive amount." 
      });
    }

    // Using exchangerate-api.com (free tier available)
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
    
    const rates = response.data.rates;
    const usd = (amount * rates.USD).toFixed(2);
    const eur = (amount * rates.EUR).toFixed(2);

    res.json({
      amount: amount,
      currency: 'INR',
      conversions: {
        USD: parseFloat(usd),
        EUR: parseFloat(eur)
      },
      rates: {
        USD: rates.USD.toFixed(4),
        EUR: rates.EUR.toFixed(4)
      }
    });
  } catch (error) {
    console.error('Currency API Error:', error.message);
    res.status(500).json({ 
      error: "Could not fetch currency exchange rates. Please try again later." 
    });
  }
});

// Quote API endpoint
app.get('/api/quote', async (req, res) => {
  try {
    // Using local quotes array for reliability
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    res.json(randomQuote);
  } catch (error) {
    console.error('Quote API Error:', error.message);
    res.status(500).json({ 
      error: "Could not fetch quote. Please try again." 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'InfoHub API is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 InfoHub server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});