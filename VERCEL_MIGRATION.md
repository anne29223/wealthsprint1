# Migration Guide: Replit to Vercel

This document provides step-by-step instructions to migrate your $100k Strategies application from Replit to Vercel.

## Overview

This full-stack application uses:
- **Frontend**: React + Vite + TypeScript
- **Backend**: Express.js API routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with express-session

## Prerequisites

- Node.js 18+ installed locally
- Git repository (GitHub/GitLab/Bitbucket)
- Vercel account
- PostgreSQL database (Vercel Postgres recommended)

## Step 1: Project Structure Changes

### 1.1 Update Package.json Scripts

Update your `package.json` with Vercel-compatible scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "start": "node dist/server/index.js",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 1.2 Create Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 1.3 Update Vite Configuration

Modify `vite.config.ts` for production build:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@assets': path.resolve(__dirname, './attached_assets'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
```

## Step 2: Database Migration

### 2.1 Set Up Vercel Postgres

1. In your Vercel dashboard, go to Storage
2. Create a new PostgreSQL database
3. Note the connection details provided

### 2.2 Update Database Configuration

Update `server/db.ts`:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// For Vercel Postgres
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Database connection string not found');
}

const client = postgres(connectionString, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  max: 1, // Limit concurrent connections
});

export const db = drizzle(client);
```

### 2.3 Update Drizzle Configuration

Update `drizzle.config.ts`:

```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || '',
  },
} satisfies Config;
```

## Step 3: API Routes Migration

### 3.1 Restructure for Vercel Functions

Create `api/` directory in project root and move your routes:

```
api/
├── strategies/
│   ├── index.ts        # GET /api/strategies
│   └── [id].ts         # GET /api/strategies/[id]
├── progress/
│   ├── index.ts        # GET /api/progress
│   └── [strategyId].ts # GET/POST/DELETE /api/progress/[strategyId]
└── bookmarks/
    ├── index.ts        # GET /api/bookmarks
    └── [strategyId].ts # GET/POST/DELETE /api/bookmarks/[strategyId]
```

### 3.2 Example API Route (`api/strategies/index.ts`)

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, search } = req.query;
    
    let strategies;
    if (search && typeof search === "string") {
      strategies = await storage.searchStrategies(search, typeof category === "string" ? category : undefined);
    } else if (category && typeof category === "string" && category !== "all") {
      strategies = await storage.getStrategiesByCategory(category);
    } else {
      strategies = await storage.getAllStrategies();
    }
    
    res.json(strategies);
  } catch (error) {
    console.error("Error fetching strategies:", error);
    res.status(500).json({ error: "Failed to fetch strategies" });
  }
}
```

## Step 4: Session Management

### 4.1 Update Session Configuration

For Vercel, update session configuration in your API routes:

```typescript
import session from 'express-session';

const sessionConfig = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
};

// Apply to each API route that needs sessions
```

## Step 5: Environment Variables

### 5.1 Required Environment Variables

Set these in your Vercel project settings:

```
# Database
POSTGRES_URL=postgresql://username:password@host:port/database
DATABASE_URL=postgresql://username:password@host:port/database

# Session
SESSION_SECRET=your-super-secret-session-key

# Database connection details (if needed separately)
PGHOST=your-db-host
PGDATABASE=your-db-name
PGUSER=your-db-user
PGPASSWORD=your-db-password
PGPORT=5432
```

### 5.2 Local Development

Create `.env.local` for local development:

```
POSTGRES_URL=postgresql://localhost:5432/your_local_db
SESSION_SECRET=dev-session-secret
NODE_ENV=development
```

## Step 6: Build and Deployment

### 6.1 Build Script

Update your build process:

```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "tsc server/**/*.ts --outDir dist/server",
    "postbuild": "npm run db:push"
  }
}
```

### 6.2 Deploy to Vercel

1. **Connect Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **Deploy via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Or deploy via Vercel Dashboard**:
   - Import your Git repository
   - Configure environment variables
   - Deploy

### 6.3 Database Setup

After deployment:

1. Run database migrations:
   ```bash
   vercel env pull .env.local
   npm run db:push
   ```

2. Seed your database with the 20 income strategies (if needed)

## Step 7: Post-Migration Checklist

- [ ] All environment variables configured
- [ ] Database connected and migrated
- [ ] API routes working
- [ ] Session authentication functional
- [ ] Frontend assets loading correctly
- [ ] Search and filtering working
- [ ] Progress tracking functional
- [ ] Bookmark system working

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure `POSTGRES_URL` is correctly set
2. **CORS Issues**: Configure CORS for your domain
3. **Session Issues**: Verify cookie settings for production
4. **Build Errors**: Check TypeScript compilation and paths

### Performance Optimization

1. **Enable Edge Functions** for better performance
2. **Implement caching** for API responses
3. **Optimize bundle size** with code splitting
4. **Use Vercel Analytics** for monitoring

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Guide](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) (similar patterns)

---

This migration guide covers the essential steps to move your application from Replit to Vercel. The main changes involve restructuring API routes, updating database configuration, and configuring the build process for Vercel's serverless environment.