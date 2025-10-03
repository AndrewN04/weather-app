# Weather Dashboard 🌤️

A modern, responsive weather dashboard built with Next.js 15, TypeScript, Redux Toolkit, and Tailwind CSS. Get real-time weather data, interactive charts, weather maps, air quality monitoring, and severe weather alerts.

![Weather Dashboard](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Weather Features
- ✅ **Current Weather Conditions** - Temperature, feels like, humidity, pressure, wind speed & direction, visibility, UV index
- ✅ **Location Search** - Search by city name or ZIP code with autocomplete suggestions
- ✅ **Geolocation Support** - Automatically detect and use device location
- ✅ **7-Day Forecast** - Daily high/low temperatures, precipitation chances, sunrise/sunset times
- ✅ **Hourly Forecast** - Temperature, rain %, wind, and conditions for the next 24 hours
- ✅ **Dynamic Weather Icons & Backgrounds** - Visual themes that adapt to current weather conditions
- ✅ **Units Toggle** - Switch between Celsius/Fahrenheit and metric/imperial units
- ✅ **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Advanced Features
- ✅ **Interactive Temperature Charts** - Visualize temperature and "feels like" trends over 24 hours using Chart.js
- ✅ **Weather Radar Map** - Live precipitation overlay using Mapbox GL JS
- ✅ **Air Quality Index (AQI)** - Real-time air quality with health recommendations and pollutant breakdown
- ✅ **Severe Weather Alerts** - Highlighted warnings for storms, heat waves, and other severe conditions
- ✅ **Sunrise & Sunset Times** - With daily tracking across the 7-day forecast
- ✅ **Wind Compass** - Visual wind direction indicator

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router and Turbopack
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS 4.x** - Utility-first styling
- **Redux Toolkit 2.9.0** - State management
- **Chart.js 4.5.0** - Data visualization
- **Mapbox GL JS 3.15.0** - Interactive maps
- **Lucide React 0.544.0** - Icon library
- **date-fns 4.1.0** - Date formatting

### Backend
- **Next.js API Routes** - Serverless endpoints
- **OpenWeatherMap API** - Weather data provider
- **Mapbox API** - Maps and geocoding
- **Native Fetch API** - HTTP client

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd weather-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_openweathermap_api_key_here"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_access_token_here"
```

**Get API Keys:**
- **OpenWeatherMap**: https://openweathermap.org/api
  - Free tier: 1,000 calls/day
  - Sign up and get your API key
- **Mapbox**: https://www.mapbox.com/
  - Free tier: 50,000 map loads/month
  - Create account and get access token

See `API-KEYS-GUIDE.md` for detailed instructions.

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── weather/      # Weather data endpoint
│   │   │   ├── air-quality/  # Air quality endpoint
│   │   │   └── geocode/      # Location search endpoint
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/           # React components (10 total)
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── DailyForecast.tsx
│   │   ├── AirQuality.tsx
│   │   ├── WeatherAlerts.tsx
│   │   ├── WeatherMap.tsx
│   │   ├── TemperatureChart.tsx
│   │   └── ReduxProvider.tsx
│   ├── store/                # Redux store
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       ├── weatherSlice.ts
│   │       └── preferencesSlice.ts
│   ├── types/                # TypeScript interfaces
│   │   └── weather.ts
│   └── utils/                # Utility functions
│       ├── weather.ts
│       └── date.ts
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎨 Key Features Explained

### Dynamic Backgrounds
The dashboard background changes based on current weather conditions:
- ☀️ Clear sky - Blue gradient
- ☁️ Cloudy - Gray gradient
- 🌧️ Rainy - Dark blue with rain effect
- ⛈️ Stormy - Dark dramatic gradient
- 🌨️ Snowy - Light gray/white gradient
- 🌫️ Foggy/Misty - Muted tones

### Temperature Charts
Interactive 24-hour temperature visualization:
- Line chart showing temperature trends
- "Feels like" comparison
- Hover tooltips with exact values
- Responsive sizing for all devices

### Weather Map
Live weather radar with:
- Mapbox GL JS integration
- Precipitation overlay
- Interactive controls (zoom, pan)
- Current location marker
- Dark theme styling

### Air Quality
Comprehensive air quality monitoring:
- AQI scale (1-5) with color coding
- Health recommendations
- Individual pollutant levels:
  - PM2.5 (fine particulate matter)
  - PM10 (coarse particulate matter)
  - O₃ (ozone)
  - NO₂ (nitrogen dioxide)
  - CO (carbon monoxide)
  - SO₂ (sulfur dioxide)
  - NH₃ (ammonia)

## 📱 Responsive Design

The app is fully optimized for:
- 📱 **Mobile** (320px+) - Touch-friendly, compact layout
- 📱 **Tablet** (768px+) - Balanced grid layout
- 💻 **Desktop** (1024px+) - Full feature display

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Chrome (Android)
- ✅ Mobile Safari (iOS)

## 📚 Documentation

- **README.md** - This file (quick start guide)
- **SETUP.md** - Detailed setup instructions
- **QUICKSTART.md** - 5-minute quick start
- **FEATURES.md** - Complete feature list
- **API-KEYS-GUIDE.md** - How to get API keys
- **CHANGELOG.md** - Version history and changes

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Maps powered by [Mapbox](https://www.mapbox.com/)
- Icons from [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the documentation files (SETUP.md, QUICKSTART.md)
2. Verify your API keys are correct
3. Check the browser console for errors
4. Ensure you're using Node.js 18+

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**

**Live Demo**: [Add your deployment URL here]

**Version**: 1.0.0 (Simplified Edition)
