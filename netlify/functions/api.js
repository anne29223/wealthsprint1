import express from "express";
import session from "express-session";
import serverless from "serverless-http";
import { storage } from "../../server/storage.js";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-for-dev',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

// Helper function to get user ID from session
function getUserId(req) {
  if (!req.session.userId) {
    req.session.userId = `user_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
  return req.session.userId;
}

// Income Strategies API routes
app.get("/strategies", async (req, res) => {
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
});

app.get("/strategies/:id", async (req, res) => {
  try {
    const strategy = await storage.getStrategyById(req.params.id);
    if (!strategy) {
      return res.status(404).json({ error: "Strategy not found" });
    }
    res.json(strategy);
  } catch (error) {
    console.error("Error fetching strategy:", error);
    res.status(500).json({ error: "Failed to fetch strategy" });
  }
});

// User Progress API routes
app.get("/progress", async (req, res) => {
  try {
    const userId = getUserId(req);
    const progress = await storage.getUserProgress(userId);
    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

app.get("/progress/:strategyId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const progress = await storage.getProgressForStrategy(userId, req.params.strategyId);
    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

app.post("/progress/:strategyId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const strategyId = req.params.strategyId;
    
    const progressValidationSchema = z.object({
      status: z.enum(["interested", "started", "completed"]).optional(),
      notes: z.string().optional(),
      startedAt: z.string().optional(),
      completedAt: z.string().optional(),
      results: z.string().optional(),
    });
    
    const validatedData = progressValidationSchema.parse(req.body);
    
    const progressData = Object.fromEntries(
      Object.entries(validatedData).filter(([_, value]) => value !== undefined)
    );
    
    const progress = await storage.updateProgress(userId, strategyId, progressData);
    res.json(progress);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid progress data", details: error.errors });
    }
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

app.delete("/progress/:strategyId", async (req, res) => {
  try {
    const userId = getUserId(req);
    await storage.deleteProgress(userId, req.params.strategyId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting progress:", error);
    res.status(500).json({ error: "Failed to delete progress" });
  }
});

// User Bookmarks API routes
app.get("/bookmarks", async (req, res) => {
  try {
    const userId = getUserId(req);
    const bookmarks = await storage.getUserBookmarks(userId);
    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

app.get("/bookmarks/:strategyId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const strategyId = req.params.strategyId;
    const isBookmarked = await storage.isBookmarked(userId, strategyId);
    res.json({ isBookmarked });
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    res.status(500).json({ error: "Failed to check bookmark status" });
  }
});

app.post("/bookmarks/:strategyId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const strategyId = req.params.strategyId;
    
    const isBookmarked = await storage.isBookmarked(userId, strategyId);
    if (isBookmarked) {
      return res.status(409).json({ error: "Strategy already bookmarked" });
    }
    
    const bookmark = await storage.addBookmark(userId, strategyId);
    res.status(201).json(bookmark);
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({ error: "Failed to add bookmark" });
  }
});

app.delete("/bookmarks/:strategyId", async (req, res) => {
  try {
    const userId = getUserId(req);
    const strategyId = req.params.strategyId;
    
    await storage.removeBookmark(userId, strategyId);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({ error: "Failed to remove bookmark" });
  }
});

export const handler = serverless(app);