import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, TrendingUp, Users } from "lucide-react";
import type { IncomeStrategy } from "@shared/schema";

interface StatsSectionProps {
  strategies: IncomeStrategy[];
}

export default function StatsSection({ strategies }: StatsSectionProps) {
  const averageIncome = Math.round(
    strategies.reduce((sum, s) => sum + s.potentialIncome, 0) / strategies.length
  );
  
  const highestIncome = Math.max(...strategies.map(s => s.potentialIncome));
  
  const beginnerStrategies = strategies.filter(s => s.difficulty === "Beginner").length;
  
  const lowCapitalStrategies = strategies.filter(s => s.initialCapital <= 5000).length;

  const stats = [
    {
      icon: DollarSign,
      value: `$${(averageIncome / 1000)}k`,
      label: "Average Income Potential",
      description: "Across all strategies"
    },
    {
      icon: TrendingUp,
      value: `$${(highestIncome / 1000)}k`,
      label: "Highest Earning Potential", 
      description: "Top strategy opportunity"
    },
    {
      icon: Users,
      value: beginnerStrategies,
      label: "Beginner-Friendly Options",
      description: "Perfect for getting started"
    },
    {
      icon: Clock,
      value: lowCapitalStrategies,
      label: "Low Capital Required",
      description: "Under $5k to start"
    }
  ];

  return (
    <section className="py-12 bg-muted/30" data-testid="stats-section">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">
            By The Numbers
          </h2>
          <p className="text-muted-foreground">
            Real data from our comprehensive strategy collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-elevate" data-testid={`stat-card-${index}`}>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-display font-bold text-foreground" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="font-medium text-sm" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground" data-testid={`stat-description-${index}`}>
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}