# API Keys Setup Guide 🔑

This guide will help you obtain the necessary API keys for the Weather Dashboard.

## Required API Keys

1. **OpenWeatherMap API Key** (Required - for weather data)
2. **Mapbox Access Token** (Optional - for weather maps)

---

## 1️⃣ OpenWeatherMap API Key

### Step-by-Step Instructions

#### Step 1: Sign Up
1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click **"Sign Up"** in the top right corner
3. Fill in your details:
   - Email address
   - Username
   - Password
4. Check your email and verify your account

#### Step 2: Get Your API Key
1. Log in to your OpenWeatherMap account
2. Click on your username in the top right
3. Select **"My API keys"** from the dropdown
4. You'll see a default API key already created
5. Copy this key (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

#### Step 3: Wait for Activation
⏰ **Important**: New API keys can take **10-15 minutes** to activate!

If you get "Invalid API key" errors initially, wait a bit and try again.

#### Step 4: Add to .env
Open your `.env` file and add:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY="paste_your_api_key_here"
```

### What You Get (Free Tier)
✅ 1,000 API calls per day
✅ Current weather data
✅ 7-day daily forecast
✅ 48-hour hourly forecast
✅ Weather alerts
✅ Air quality data
✅ Geocoding (location search)

### API Documentation
- [One Call API 3.0](https://openweathermap.org/api/one-call-3)
- [Air Pollution API](https://openweathermap.org/api/air-pollution)
- [Geocoding API](https://openweathermap.org/api/geocoding-api)

---

## 2️⃣ Mapbox Access Token

### Step-by-Step Instructions

#### Step 1: Sign Up
1. Go to [https://www.mapbox.com/](https://www.mapbox.com/)
2. Click **"Start building for free"**
3. Sign up with:
   - Email address, OR
   - GitHub account, OR
   - Google account

#### Step 2: Get Your Token
1. After signing up, you'll be redirected to your account page
2. Navigate to **Account → Tokens**
3. You'll see a **"Default public token"** already created
4. Click the copy icon to copy it (looks like: `pk.eyJ1Ij...`)

#### Step 3: Add to .env
Open your `.env` file and add:
```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="paste_your_token_here"
```

### What You Get (Free Tier)
✅ 50,000 map loads per month
✅ Unlimited vector tiles
✅ Interactive maps
✅ Zoom/pan controls
✅ Custom map styles

### Token Types
- **Public tokens** (pk.*): Safe to use in frontend code ✅
- **Secret tokens** (sk.*): Never use in frontend code ❌

Make sure you're using a **public token** (starts with `pk.`)!

### API Documentation
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)
- [Map Styles](https://docs.mapbox.com/api/maps/styles/)

---

## 3️⃣ Complete .env File

Your complete `.env` file should look like this:

```env
# Database Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/weather_dashboard?schema=public"

# OpenWeatherMap API (Required)
NEXT_PUBLIC_OPENWEATHER_API_KEY="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"

# Mapbox API (Optional - for weather maps)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
```

Replace the example values with your actual keys!

---

## 🔒 Security Best Practices

### DO ✅
- Keep your `.env` file private
- Add `.env` to `.gitignore` (already done)
- Use `NEXT_PUBLIC_` prefix for client-side keys
- Rotate keys periodically
- Monitor API usage in dashboards

### DON'T ❌
- Commit `.env` to version control
- Share keys publicly
- Use secret tokens in frontend code
- Hardcode keys in your code
- Use production keys in development

---

## 🧪 Testing Your Keys

### Test OpenWeatherMap Key

```bash
# Windows PowerShell
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY"
```

Expected response: JSON with weather data

### Test Mapbox Token

Visit in browser:
```
https://api.mapbox.com/styles/v1/mapbox/dark-v11?access_token=YOUR_TOKEN
```

Expected response: JSON with style data

---

## 🐛 Troubleshooting

### OpenWeatherMap Issues

**"Invalid API key" error**
- ✅ Wait 10-15 minutes after creating key
- ✅ Check for typos in `.env` file
- ✅ Ensure no extra spaces around the key
- ✅ Restart development server after adding key

**"401 Unauthorized" error**
- ✅ Verify key is correct
- ✅ Check if key is activated
- ✅ Ensure you're using One Call API 3.0

**"429 Too Many Requests" error**
- ✅ You've exceeded 1,000 calls/day
- ✅ Wait until next day or upgrade plan
- ✅ Implement caching in production

### Mapbox Issues

**Map not loading**
- ✅ Check if token is in `.env`
- ✅ Verify token starts with `pk.` (not `sk.`)
- ✅ Check browser console for errors
- ✅ Ensure token has proper scopes

**"401: Unauthorized" error**
- ✅ Token might be revoked
- ✅ Create a new token
- ✅ Check token permissions

---

## 📊 Monitoring Usage

### OpenWeatherMap Dashboard
1. Log in to [https://home.openweathermap.org/](https://home.openweathermap.org/)
2. Go to **"Statistics"**
3. View your API call usage

### Mapbox Dashboard
1. Log in to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Go to **"Statistics"**
3. View your map loads usage

---

## 💡 Pro Tips

### For Development
- Use separate API keys for dev and production
- Set up request caching to reduce API calls
- Monitor your usage regularly

### For Production
- Implement rate limiting
- Cache weather data (e.g., 10 minutes)
- Use environment-specific keys
- Set up usage alerts

---

## 🆘 Need Help?

### OpenWeatherMap Support
- [FAQ](https://openweathermap.org/faq)
- [Contact Support](https://openweathermap.org/support)

### Mapbox Support
- [Documentation](https://docs.mapbox.com/)
- [Community Forum](https://community.mapbox.com/)
- [Support](https://www.mapbox.com/contact)

---

## ✅ Verification Checklist

Before running the app, ensure:

- [ ] OpenWeatherMap account created
- [ ] OpenWeatherMap API key copied
- [ ] API key added to `.env`
- [ ] Waited 10-15 minutes for activation
- [ ] Mapbox account created (optional)
- [ ] Mapbox token copied (optional)
- [ ] Token added to `.env` (optional)
- [ ] `.env` file saved
- [ ] Development server restarted

---

## 🚀 Ready to Go!

Once you have your API keys set up:

```bash
# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and enjoy your weather dashboard! 🌤️

---

**Note**: The app will work without the Mapbox token, but the weather map feature won't be available. All other features will work normally with just the OpenWeatherMap key.
