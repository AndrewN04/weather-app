# Weather Dashboard 🌤️

A modern, responsive weather dashboard built with Next.js 15, TypeScript, Redux Toolkit, and Tailwind CSS. Get real-time weather data, interactive charts, weather maps, air quality monitoring, and more.

![Weather Dashboard](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=for-the-badge&logo=tailwind-css)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green?style=for-the-badge&logo=leaflet)

## 🌟 Features

### Core Weather Features
- ✅ **Current Weather Conditions** - Temperature, feels like, humidity, pressure, wind speed & direction, visibility, UV index
- ✅ **Location Search** - Search by city name or ZIP code (US and international)
- ✅ **User-Initiated Geolocation** - Click button to use device location (privacy-first approach)
- ✅ **7-Day Forecast** - Daily high/low temperatures, precipitation chances, weather conditions
- ✅ **Hourly Forecast** - Temperature, rain %, wind, and conditions for the next 24 hours
- ✅ **Dynamic Weather Icons & Backgrounds** - Visual themes that adapt to current weather conditions
- ✅ **Additional Weather Details** - Rain, snow, sea level, ground level, moon phase, cloud cover
- ✅ **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Advanced Features
- ✅ **Interactive Temperature Charts** - Visualize temperature and "feels like" trends over 24 hours using Chart.js
- ✅ **Weather Radar Map** - Live precipitation overlay using Leaflet + OpenStreetMap (70% smaller bundle than Mapbox!)
- ✅ **Air Quality Index (AQI)** - Real-time air quality with health recommendations and pollutant breakdown
- ✅ **Sunrise & Sunset Times** - With daily tracking across the 7-day forecast
- ✅ **Wind Direction Indicator** - Visual compass showing wind direction
- ✅ **Lazy Loading** - Charts and maps load on-demand for better performance

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router and Turbopack
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS 4.x** - Utility-first styling
- **Redux Toolkit 2.9.0** - State management
- **Chart.js 4.5.0** - Data visualization
- **Leaflet 1.9.4** - Interactive maps (~140 KB)
- **React-Leaflet 5.0.0** - React integration for Leaflet
- **Lucide React 0.544.0** - Icon library
- **date-fns 4.1.0** - Date formatting

### Backend
- **Next.js API Routes** - Serverless endpoints
- **OpenWeatherMap API** - Weather data, geocoding, and radar tiles
- **Native Fetch API** - HTTP client

### Performance
- **First Load JS**: 139 kB (optimized)
- **Lighthouse Score**: 90+ Performance
- **Bundle Optimization**: Tree-shaking, lazy loading, code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### 1. Clone the Repository

```bash
git clone https://github.com/AndrewN04/weather-app.git
cd weather-app
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
```

**Get API Key:**
- **OpenWeatherMap**: https://openweathermap.org/api
  - Free tier: 1,000 calls/day
  - Sign up and get your API key
  - Provides weather data, geocoding, and radar tiles

**Note:** No Mapbox API key needed! This project uses Leaflet with free OpenStreetMap tiles.

See `.env.example` for the template.

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
weather-app/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── weather/      # Weather data endpoint
│   │   │   ├── air-quality/  # Air quality endpoint
│   │   │   └── geocode/      # Location search endpoint (city & ZIP)
│   │   ├── page.tsx          # Main dashboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── DailyForecast.tsx
│   │   ├── AdditionalDetails.tsx
│   │   ├── AirQuality.tsx
│   │   ├── WeatherMap.tsx     # Leaflet + OpenStreetMap
│   │   ├── TemperatureChart.tsx
│   │   └── ReduxProvider.tsx
│   ├── store/                # Redux store
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       └── weatherSlice.ts
│   ├── types/                # TypeScript interfaces
│   │   └── weather.ts
│   └── utils/                # Utility functions
│       ├── weather.ts
│       └── date.ts
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎨 Key Features Explained

### ZIP Code Search
Search by city name OR ZIP code:
- **US ZIP codes**: Just type 5 digits (e.g., "10001")
- **International postal codes**: Format as "postal,COUNTRY" (e.g., "SW1A,GB")
- Auto-detects ZIP codes and routes to correct geocoding API

### User-Initiated Location
Privacy-first geolocation:
- App loads with default location (New York)
- Click "Current Location" button to request device location
- No automatic location prompts on page load

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
- Lazy loaded for better performance

### Weather Map (Leaflet + OpenStreetMap)
Live weather radar with:
- **Leaflet 1.9.4** - Lightweight mapping library (~140 KB vs Mapbox 506 KB)
- **OpenStreetMap tiles** - Free, no API key required
- **Precipitation overlay** - Live radar from OpenWeatherMap
- Interactive controls (zoom, pan)
- Current location marker with popup
- Lazy loaded for optimal performance

### Air Quality
Comprehensive air quality monitoring:
- AQI scale (1-5) with color coding
- Health recommendations based on AQI level
- Individual pollutant levels:
  - PM2.5 (fine particulate matter)
  - PM10 (coarse particulate matter)
  - O₃ (ozone)
  - NO₂ (nitrogen dioxide)
  - CO (carbon monoxide)
  - SO₂ (sulfur dioxide)

### Additional Weather Details
Conditional display of relevant metrics:
- 🌧️ **Rain** - Volume in last hour/3 hours
- 🌨️ **Snow** - Volume in last hour/3 hours
- 🌊 **Sea Level Pressure** - Atmospheric pressure at sea level
- 🏔️ **Ground Level Pressure** - Atmospheric pressure at ground level
- 🌙 **Moon Phase** - Current lunar phase
- ☁️ **Cloud Cover** - Percentage of sky coverage

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

## � Performance Optimizations

- **Lazy Loading** - Maps and charts load only when needed
- **Code Splitting** - Reduced initial bundle size
- **Tree Shaking** - Optimized package imports (Lucide, Chart.js, Leaflet)
- **Image Optimization** - Next.js Image component for weather icons
- **Turbopack** - Fast builds and hot module replacement
- **Lighthouse Score** - 90+ Performance rating
- **Bundle Size** - 139 kB First Load JS (70% reduction from Mapbox migration)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Maps powered by [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- Icons from [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## 📞 Support

If you encounter any issues or have questions:
1. Verify your OpenWeatherMap API key is correct in `.env`
2. Check the browser console for errors
3. Ensure you're using Node.js 18+
4. Try clearing the build cache: `rm -rf .next` and rebuild

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**

**Repository**: https://github.com/AndrewN04/weather-app

**Version**: 2.0.0 (Leaflet Edition)
