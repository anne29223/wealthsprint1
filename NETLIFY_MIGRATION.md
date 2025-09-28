# Quick Netlify Migration Guide

## 🚀 3-Step Migration Process

### Step 1: Prepare Project Structure

Create these files in your project root:

**netlify.toml**
```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**public/_redirects**
```
/api/* /.netlify/functions/api/:splat 200
/* /index.html 200
```

### Step 2: Convert Backend to Netlify Functions

Install dependencies:
```bash
npm install @netlify/functions serverless-http
```

Create `netlify/functions/api.js`:
```javascript
import serverless from 'serverless-http';
import express from 'express';
import session from 'express-session';
import { storage } from '../../server/storage.js';

const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

// Copy all your routes from server/routes.ts here
app.get('/strategies', async (req, res) => {
  const { category, search } = req.query;
  let strategies;
  if (search) {
    strategies = await storage.searchStrategies(search, category);
  } else if (category && category !== "all") {
    strategies = await storage.getStrategiesByCategory(category);
  } else {
    strategies = await storage.getAllStrategies();
  }
  res.json(strategies);
});

// Add all other routes...

export const handler = serverless(app);
```

### Step 3: Deploy

**Option A: Git Deploy (Recommended)**
```bash
git add .
git commit -m "Netlify migration"
git push origin main
```
Then connect your repo at [netlify.com/new](https://netlify.com/new)

**Option B: Direct Deploy**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🗄️ Database Options

Choose one:

**Quick Option**: Use Neon (free tier)
```bash
# Get connection string from neon.tech
# Add to Netlify environment variables
```

**Netlify Option**: Use Netlify's new database
```bash
# Available in beta - provides PostgreSQL automatically
```

## ⚙️ Environment Variables

Set in Netlify dashboard → Site settings → Environment variables:

```
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_session_secret
NODE_ENV=production
```

## 🔧 Quick Fixes

Update `vite.config.ts`:
```typescript
export default defineConfig({
  build: {
    outDir: 'dist'
  }
});
```

Update API calls in frontend to use relative paths:
```javascript
// Change from: http://localhost:5000/api/strategies
// To: /api/strategies
```

## ✅ Deployment Checklist

- [ ] Project builds locally (`npm run build`)
- [ ] Database connection string added to environment
- [ ] Git repository connected to Netlify
- [ ] Functions deploy successfully
- [ ] Frontend loads and API calls work

**Total migration time: ~30 minutes**

## 🚨 If Something Breaks

1. Check function logs in Netlify dashboard
2. Verify environment variables are set
3. Test API endpoints: `https://yoursite.netlify.app/api/strategies`

That's it! Your app should be live on Netlify.