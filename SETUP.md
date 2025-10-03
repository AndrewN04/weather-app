# Weather Dashboard - Setup Guide

## 📋 Prerequisites

Before setting up this weather dashboard, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **PostgreSQL** database (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

## 🔑 Required API Keys

You'll need two free API keys:

### 1. OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After logging in, go to "API Keys" section
4. Copy your API key (it may take a few minutes to activate)

**Free Tier Includes:**
- 1,000 API calls per day
- Current weather data
- 7-day forecast
- Hourly forecast (48 hours)
- Weather alerts
- Air quality data

### 2. Mapbox Access Token

1. Visit [Mapbox](https://www.mapbox.com/)
2. Click "Start building for free" and create an account
3. Navigate to Account → Tokens
4. Copy your default public token (or create a new one)

**Free Tier Includes:**
- 50,000 map loads per month
- Unlimited vector tiles

## 🚀 Installation Steps

### Step 1: Project Setup

```bash
# Navigate to the project directory
cd weather-dashboard

# Install all dependencies
npm install
```

### Step 2: Environment Configuration

1. Create a `.env` file in the root directory
2. Copy the following template and fill in your values:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/weather_dashboard?schema=public"

# OpenWeatherMap API
NEXT_PUBLIC_OPENWEATHER_API_KEY="paste_your_openweathermap_api_key_here"

# Mapbox API
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="paste_your_mapbox_token_here"
```

**Database URL Format:**
- Replace `username` with your PostgreSQL username (default: `postgres`)
- Replace `password` with your PostgreSQL password
- Replace `localhost` with your database host (use `localhost` for local)
- Replace `5432` with your PostgreSQL port (default: `5432`)
- `weather_dashboard` is the database name (you can change this)

### Step 3: Database Setup

```bash
# Create the database (if it doesn't exist)
# Log into PostgreSQL and run:
# CREATE DATABASE weather_dashboard;

# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

**Note:** If you encounter database connection errors, verify:
- PostgreSQL is running
- Database credentials are correct
- Database exists
- User has proper permissions

### Step 4: Run the Application

```bash
# Start the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🧪 Testing the Setup

1. **Check Development Server**: Open http://localhost:3000
2. **Test Geolocation**: Click "Current Location" button (allow browser location access)
3. **Test Search**: Type a city name in the search bar
4. **Verify Weather Data**: Current weather should display
5. **Check Charts**: Temperature chart should render
6. **Check Map**: Weather map should load (requires Mapbox token)
7. **Check Air Quality**: AQI widget should display

## 🏗️ Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Troubleshooting

### Issue: "Failed to fetch weather data"

**Solution:**
- Verify `NEXT_PUBLIC_OPENWEATHER_API_KEY` is set correctly in `.env`
- Check if API key is activated (can take 10-15 minutes after creation)
- Ensure you're not exceeding API rate limits (1,000 calls/day for free tier)

### Issue: Weather map not loading

**Solution:**
- Verify `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is set correctly in `.env`
- Check browser console for specific errors
- Ensure token is a public token, not a secret token

### Issue: Database connection error

**Solution:**
- Verify PostgreSQL is running: `pg_isready` (on systems with PostgreSQL CLI)
- Check `DATABASE_URL` format in `.env`
- Ensure database exists: `CREATE DATABASE weather_dashboard;`
- Verify user permissions

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Location not found

**Solution:**
- Ensure browser location permissions are granted
- Try searching for a city manually
- Check browser console for geolocation errors

## 📊 Database Management

### View Database

```bash
# Open Prisma Studio (visual database editor)
npx prisma studio
```

### Reset Database

```bash
# WARNING: This will delete all data
npx prisma migrate reset
```

### Update Schema

After modifying `prisma/schema.prisma`:

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Regenerate Prisma client
npx prisma generate
```

## 🌍 Environment Variables Explained

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Yes | OpenWeatherMap API key for weather data |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Optional* | Mapbox token for weather maps |

*Weather maps won't work without Mapbox token, but rest of the app will function normally.

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep API keys confidential
- Use environment-specific `.env` files for different deployments
- Rotate API keys periodically

## 📈 Performance Tips

1. **API Rate Limiting**: Free tier allows 1,000 calls/day
   - Cache results when possible
   - Implement request debouncing

2. **Image Optimization**: Weather icons are loaded from OpenWeatherMap CDN
   - Consider caching icons locally for production

3. **Map Performance**: Mapbox maps can be resource-intensive
   - Limit map interactions on mobile devices

## 🎯 Next Steps

After setup:
1. Customize the dashboard layout to your preferences
2. Add favorite locations feature
3. Implement user authentication
4. Set up weather alerts notifications
5. Deploy to production (Vercel, Netlify, etc.)

## 💡 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)

## 🆘 Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify all environment variables are set
4. Check API service status pages
5. Review application logs

---

**Need more help?** Check the main README.md for feature documentation and project structure.
