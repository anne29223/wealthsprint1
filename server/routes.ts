import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIncomeStrategySchema } from "@shared/schema";
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

  // Removed POST endpoint for security - not needed for this MVP

  const httpServer = createServer(app);

  return httpServer;
}
