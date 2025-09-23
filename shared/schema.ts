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