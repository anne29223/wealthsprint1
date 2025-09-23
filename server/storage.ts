import { type User, type InsertUser, type IncomeStrategy, type InsertIncomeStrategy, type UserProgress, type InsertUserProgress, users, incomeStrategies, userProgress } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, and } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Income Strategy methods
  getAllStrategies(): Promise<IncomeStrategy[]>;
  getStrategiesByCategory(category: string): Promise<IncomeStrategy[]>;
  searchStrategies(query: string, category?: string): Promise<IncomeStrategy[]>;
  getStrategyById(id: string): Promise<IncomeStrategy | undefined>;
  createStrategy(strategy: InsertIncomeStrategy): Promise<IncomeStrategy>;
  
  // User Progress methods
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getProgressForStrategy(userId: string, strategyId: string): Promise<UserProgress | undefined>;
  updateProgress(userId: string, strategyId: string, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
  deleteProgress(userId: string, strategyId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Income Strategy methods
  async getAllStrategies(): Promise<IncomeStrategy[]> {
    return await db.select().from(incomeStrategies);
  }

  async getStrategiesByCategory(category: string): Promise<IncomeStrategy[]> {
    return await db.select().from(incomeStrategies).where(eq(incomeStrategies.category, category));
  }

  async searchStrategies(query: string, category?: string): Promise<IncomeStrategy[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    const searchConditions = or(
      ilike(incomeStrategies.title, searchTerm),
      ilike(incomeStrategies.description, searchTerm),
      ilike(incomeStrategies.category, searchTerm)
    );
    
    if (category && category !== "all") {
      return await db.select().from(incomeStrategies).where(
        and(
          eq(incomeStrategies.category, category),
          searchConditions
        )
      );
    }
    
    return await db.select().from(incomeStrategies).where(searchConditions);
  }

  async getStrategyById(id: string): Promise<IncomeStrategy | undefined> {
    const [strategy] = await db.select().from(incomeStrategies).where(eq(incomeStrategies.id, id));
    return strategy || undefined;
  }

  async createStrategy(insertStrategy: InsertIncomeStrategy): Promise<IncomeStrategy> {
    const [strategy] = await db
      .insert(incomeStrategies)
      .values(insertStrategy)
      .returning();
    return strategy;
  }

  // User Progress methods
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async getProgressForStrategy(userId: string, strategyId: string): Promise<UserProgress | undefined> {
    const [progress] = await db.select().from(userProgress).where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.strategyId, strategyId)
      )
    );
    return progress || undefined;
  }

  async updateProgress(userId: string, strategyId: string, progressData: Partial<InsertUserProgress>): Promise<UserProgress> {
    // Check if progress exists
    const existing = await this.getProgressForStrategy(userId, strategyId);
    
    if (existing) {
      // Update existing progress - defensively whitelist allowed fields and filter undefined
      const { status, notes, startedAt, completedAt, results } = progressData;
      const cleanData = Object.fromEntries(
        Object.entries({ status, notes, startedAt, completedAt, results })
          .filter(([_, value]) => value !== undefined)
      );
      
      const [updated] = await db
        .update(userProgress)
        .set(cleanData)
        .where(
          and(
            eq(userProgress.userId, userId),
            eq(userProgress.strategyId, strategyId)
          )
        )
        .returning();
      return updated;
    } else {
      // Create new progress - ensure required fields are present
      const insertData: InsertUserProgress = {
        userId,
        strategyId,
        status: progressData.status || "interested",
        notes: progressData.notes || null,
        startedAt: progressData.startedAt || null,
        completedAt: progressData.completedAt || null,
        results: progressData.results || null,
      };
      
      const [created] = await db
        .insert(userProgress)
        .values(insertData)
        .returning();
      return created;
    }
  }

  async deleteProgress(userId: string, strategyId: string): Promise<void> {
    await db.delete(userProgress).where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.strategyId, strategyId)
      )
    );
  }
}

export const storage = new DatabaseStorage();
