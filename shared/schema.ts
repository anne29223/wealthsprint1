import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Income Strategy Types
export const incomeStrategies = pgTable("income_strategies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  potentialIncome: integer("potential_income").notNull(), // in dollars
  timeToStart: text("time_to_start").notNull(), // e.g., "1-2 weeks", "1 month"
  difficulty: text("difficulty").notNull(), // "Beginner", "Intermediate", "Advanced"
  initialCapital: integer("initial_capital").notNull(), // in dollars
  requiredSkills: text("required_skills").array().notNull(),
  steps: text("steps").array().notNull(),
});

export const insertIncomeStrategySchema = createInsertSchema(incomeStrategies).omit({
  id: true,
});

export type InsertIncomeStrategy = z.infer<typeof insertIncomeStrategySchema>;
export type IncomeStrategy = typeof incomeStrategies.$inferSelect;

// User Progress Tracking
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(), // For now, we'll use session-based tracking
  strategyId: varchar("strategy_id").notNull().references(() => incomeStrategies.id),
  status: text("status").notNull(), // "interested", "started", "completed"
  notes: text("notes"), // User's notes about their progress
  startedAt: text("started_at"), // ISO date string when they started
  completedAt: text("completed_at"), // ISO date string when completed
  results: text("results"), // What results they achieved
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

// User Bookmarks/Favorites
export const userBookmarks = pgTable("user_bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(), // Session-based user tracking
  strategyId: varchar("strategy_id").notNull().references(() => incomeStrategies.id),
  bookmarkedAt: text("bookmarked_at").notNull(), // ISO date string when bookmarked
});

export const insertUserBookmarkSchema = createInsertSchema(userBookmarks).omit({
  id: true,
});

export type InsertUserBookmark = z.infer<typeof insertUserBookmarkSchema>;
export type UserBookmark = typeof userBookmarks.$inferSelect;

// Category enum for filtering
export const categories = [
  "High-Paying Jobs",
  "Freelancing", 
  "Business Ventures",
  "Investment",
  "Side Hustles",
  "Digital Products"
] as const;

export type Category = typeof categories[number];