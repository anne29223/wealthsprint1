import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIncomeStrategySchema, insertUserProgressSchema, insertUserBookmarkSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Income Strategies API routes
  app.get("/api/strategies", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let strategies;
      if (search && typeof search === "string") {
        // When searching, also apply category filter if provided
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

  app.get("/api/strategies/:id", async (req, res) => {
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
  // Simple session-based user ID (in production, use proper authentication)
  const getUserId = (req: any) => {
    if (!req.session.userId) {
      req.session.userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    return req.session.userId;
  };

  app.get("/api/progress", async (req, res) => {
    try {
      const userId = getUserId(req);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.get("/api/progress/:strategyId", async (req, res) => {
    try {
      const userId = getUserId(req);
      const progress = await storage.getProgressForStrategy(userId, req.params.strategyId);
      res.json(progress || null);
    } catch (error) {
      console.error("Error fetching strategy progress:", error);
      res.status(500).json({ error: "Failed to fetch strategy progress" });
    }
  });

  app.post("/api/progress/:strategyId", async (req, res) => {
    try {
      const userId = getUserId(req);
      const strategyId = req.params.strategyId;
      
      // Validate request body with strict schema - only allow specific fields
      const progressValidationSchema = z.object({
        status: z.enum(["interested", "started", "completed"]).optional(),
        notes: z.string().optional(),
        startedAt: z.string().optional(),
        completedAt: z.string().optional(),
        results: z.string().optional(),
      });
      
      const validatedData = progressValidationSchema.parse(req.body);
      
      // Strip undefined values to avoid passing them to database
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

  app.delete("/api/progress/:strategyId", async (req, res) => {
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
  app.get("/api/bookmarks", async (req, res) => {
    try {
      const userId = getUserId(req);
      const bookmarks = await storage.getUserBookmarks(userId);
      res.json(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
  });

  app.get("/api/bookmarks/:strategyId", async (req, res) => {
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

  app.post("/api/bookmarks/:strategyId", async (req, res) => {
    try {
      const userId = getUserId(req);
      const strategyId = req.params.strategyId;
      
      // Check if already bookmarked
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

  app.delete("/api/bookmarks/:strategyId", async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
