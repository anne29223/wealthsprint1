import { type User, type InsertUser, type IncomeStrategy, type InsertIncomeStrategy, users, incomeStrategies } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
