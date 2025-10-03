# Weather Dashboard 🌤️This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A comprehensive, modern weather dashboard built with Next.js 14, TypeScript, Redux Toolkit, and Tailwind CSS. Features real-time weather data, interactive charts, weather maps, air quality monitoring, and severe weather alerts.## Getting Started



## 🌟 FeaturesFirst, run the development server:



### Core Features```bash

- **Current Weather Conditions** - Temperature, feels like, humidity, pressure, wind speed & direction, visibility, UV indexnpm run dev

- **Location Search** - Search by city name or ZIP code with autocomplete suggestions# or

- **Geolocation Support** - Automatically detect and use device locationyarn dev

- **7-Day Forecast** - Daily high/low temperatures, precipitation chances, sunrise/sunset times# or

- **Hourly Forecast** - Temperature, rain %, wind, and conditions for the next 24 hourspnpm dev

- **Dynamic Weather Icons & Backgrounds** - Visual themes that adapt to current weather conditions# or

- **Units Toggle** - Switch between Celsius/Fahrenheit and metric/imperial unitsbun dev

- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices```



### Advanced FeaturesOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Interactive Temperature Charts** - Visualize temperature and "feels like" trends over 24 hours using Chart.js

- **Weather Radar Map** - Live precipitation overlay using Mapbox GL JSYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Air Quality Index (AQI)** - Real-time air quality with health recommendations

- **Severe Weather Alerts** - Highlighted warnings for storms, heat waves, and other severe conditionsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Sunrise & Sunset Times** - With daily tracking across the 7-day forecast

- **Weather Descriptions** - Natural language summaries of current conditions## Learn More



## 🛠️ Tech StackTo learn more about Next.js, take a look at the following resources:



### Frontend- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit, Chart.js, Mapbox GL JS, Lucide React- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



### BackendYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- Next.js API Routes, Prisma, PostgreSQL, OpenWeatherMap API

## Deploy on Vercel

## 🚀 Getting Started

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### 1. Install Dependencies

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/weather_dashboard?schema=public"
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_openweathermap_api_key_here"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_access_token_here"
\`\`\`

**Get API Keys:**
- OpenWeatherMap: https://openweathermap.org/api (Free tier: 1,000 calls/day)
- Mapbox: https://www.mapbox.com/ (Free tier available)

### 3. Set Up Database

\`\`\`bash
npx prisma generate
npx prisma migrate dev --name init
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── api/          # API routes (weather, air-quality, geocode)
│   ├── page.tsx      # Main dashboard
│   └── layout.tsx    # Root layout
├── components/       # React components
├── store/           # Redux store & slices
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
└── lib/             # Prisma client
\`\`\`

## 🎨 Key Features

- **Dynamic Backgrounds** - Changes based on weather conditions (clear, rainy, snowy, etc.)
- **Temperature Charts** - Interactive 24-hour temperature trends
- **Weather Map** - Live precipitation radar with Mapbox
- **Air Quality** - Color-coded AQI with pollutant details (PM2.5, PM10, O₃, NO₂)

## 📞 Support

Weather data provided by [OpenWeatherMap](https://openweathermap.org/) | Maps by [Mapbox](https://www.mapbox.com/)

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
