import { db } from "./db";
import { incomeStrategies } from "@shared/schema";
import { mockStrategies } from "../client/src/data/strategies";

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    // Clear existing data
    await db.delete(incomeStrategies);
    console.log("Cleared existing strategies");
    
    // Insert mock strategies
    for (const strategy of mockStrategies) {
      const { id, ...strategyData } = strategy; // Remove the ID since database will generate it
      await db.insert(incomeStrategies).values(strategyData);
    }
    
    console.log(`✅ Seeded ${mockStrategies.length} strategies`);
    
    // Verify data
    const count = await db.select().from(incomeStrategies);
    console.log(`📊 Total strategies in database: ${count.length}`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seed();