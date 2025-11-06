# InfoHub - Full-Stack Web Application

A single-page application (SPA) that integrates three everyday utilities: Real-time Weather Display, Currency Converter (INR to USD/EUR), and Motivational Quote Generator.

## 🚀 Features

- **Weather Module**: Real-time weather data with current temperature and conditions
- **Currency Converter**: Convert INR to USD and EUR with live exchange rates
- **Quote Generator**: Display motivational quotes with refresh functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend
- React (JavaScript)
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js
- Express.js
- CORS for cross-origin requests
- Axios for external API calls

### External APIs
- OpenWeatherMap API for weather data
- ExchangeRate-API for currency conversion
- Built-in quotes collection

## 📁 Project Structure

```
InfoHub-Challenge/
├── client/                          (React Frontend)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── QuoteGenerator.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── server/                          (Node.js/Express Backend)
    ├── .env                         (API Keys)
    ├── server.js
    └── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn
- API keys for external services

### Installation

1. **Clone or download the project**
2. **Set up the Backend:**
   ```bash
   cd server
   npm install
   ```

3. **Create `.env` file in server directory:**
   ```env
   WEATHER_API_KEY=your_openweathermap_api_key
   PORT=3001
   ```

4. **Set up the Frontend:**
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the Backend Server:**
   ```bash
   cd server
   npm start
   ```
   Server will run on http://localhost:3001

2. **Start the Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 🔧 API Endpoints

- `GET /api/weather` - Get current weather data
- `GET /api/currency?amount=100` - Convert INR to USD/EUR
- `GET /api/quote` - Get a random motivational quote

## 🎨 Features Demo

1. **Weather Tab**: Shows current weather for a default city
2. **Currency Tab**: Input INR amount to convert to USD/EUR
3. **Quote Tab**: Click refresh to get new motivational quotes

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Environment Variables

Create a `.env` file in the server directory:
```env
WEATHER_API_KEY=your_api_key_here
PORT=3001
```

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended)
- Netlify
- Heroku

## 📝 License

This project is created for educational purposes as part of the ByteXL assignment.