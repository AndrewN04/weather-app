# Quick Start Guide 🚀

Get your weather dashboard running in 5 minutes!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Get API Keys (2 min)

### OpenWeatherMap (Required)
1. Go to https://openweathermap.org/api
2. Sign up → Get API key
3. Wait ~10 mins for activation

### Mapbox (Optional - for maps)
1. Go to https://www.mapbox.com/
2. Sign up → Copy default token

## Step 3: Configure Environment (1 min)

Create `.env` file in root:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/weather_dashboard?schema=public"
NEXT_PUBLIC_OPENWEATHER_API_KEY="your_key_here"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_token_here"
```

## Step 4: Setup Database (1 min)

```bash
# Make sure PostgreSQL is running first!
npx prisma generate
npx prisma migrate dev --name init
```

## Step 5: Start the App (instant)

```bash
npm run dev
```

Visit http://localhost:3000 🎉

---

## Common Issues

**"Failed to fetch weather data"**
- API key not activated yet (wait 10-15 mins)
- Wrong API key format

**Database error**
- PostgreSQL not running
- Wrong credentials in DATABASE_URL

**Map not showing**
- Mapbox token missing (app works without maps)

---

Need detailed instructions? See [SETUP.md](./SETUP.md)
