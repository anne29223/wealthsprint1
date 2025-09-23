import StrategyCard from "./StrategyCard";
import type { IncomeStrategy } from "@shared/schema";

interface StrategiesGridProps {
  strategies: IncomeStrategy[];
  loading?: boolean;
}

export default function StrategiesGrid({ strategies, loading }: StrategiesGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="h-96 bg-muted animate-pulse rounded-lg"
            data-testid={`skeleton-${i}`}
          />
        ))}
      </div>
    );
  }

  if (strategies.length === 0) {
    return (
      <div className="text-center py-12" data-testid="no-strategies">
        <div className="text-muted-foreground text-lg mb-2">No strategies found</div>
        <div className="text-muted-foreground text-sm">
          Try adjusting your search or filter criteria
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="strategies-grid">
      {strategies.map((strategy) => (
        <StrategyCard key={strategy.id} strategy={strategy} />
      ))}
    </div>
  );
}