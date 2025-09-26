import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  Code,
  Building2,
  TrendingDown,
  Zap,
  Smartphone,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import ProgressTracker from "./ProgressTracker";
import { useBookmarkStatus, useAddBookmark, useRemoveBookmark } from "@/hooks/useBookmarks";
import type { IncomeStrategy } from "@shared/schema";

interface StrategyCardProps {
  strategy: IncomeStrategy;
}

const categoryIcons = {
  "High-Paying Jobs": Briefcase,
  "Freelancing": Code,
  "Business Ventures": Building2,
  "Investment": TrendingUp,
  "Side Hustles": Zap,
  "Digital Products": Smartphone,
};

const difficultyColors = {
  "Beginner": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Intermediate": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  "Advanced": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default function StrategyCard({ strategy }: StrategyCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const CategoryIcon = categoryIcons[strategy.category as keyof typeof categoryIcons] || Briefcase;
  
  const { data: bookmarkStatus, isLoading: isBookmarkLoading } = useBookmarkStatus(strategy.id);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();
  
  const isBookmarked = bookmarkStatus?.isBookmarked || false;
  
  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark.mutate(strategy.id);
    } else {
      addBookmark.mutate(strategy.id);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-strategy-${strategy.id}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CategoryIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg leading-tight" data-testid={`text-title-${strategy.id}`}>
                {strategy.title}
              </h3>
              <Badge variant="outline" className="mt-1 text-xs">
                {strategy.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleBookmarkToggle}
              disabled={isBookmarkLoading || addBookmark.isPending || removeBookmark.isPending}
              data-testid={`button-bookmark-${strategy.id}`}
              className="h-8 w-8"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <div className="text-right">
              <div className="font-display font-bold text-2xl text-primary" data-testid={`text-income-${strategy.id}`}>
                {formatCurrency(strategy.potentialIncome)}
              </div>
              <div className="text-xs text-muted-foreground">potential/year</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-description-${strategy.id}`}>
          {strategy.description}
        </p>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span data-testid={`text-time-${strategy.id}`}>{strategy.timeToStart}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            <span data-testid={`text-capital-${strategy.id}`}>{formatCurrency(strategy.initialCapital)} to start</span>
          </div>
          <Badge 
            className={`${difficultyColors[strategy.difficulty as keyof typeof difficultyColors]} text-xs`}
            data-testid={`badge-difficulty-${strategy.id}`}
          >
            {strategy.difficulty}
          </Badge>
        </div>

        {/* Skills Preview */}
        <div className="flex flex-wrap gap-1">
          {strategy.requiredSkills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {strategy.requiredSkills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{strategy.requiredSkills.length - 3} more
            </Badge>
          )}
        </div>

        {/* Expandable Details */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-0 h-auto hover:bg-transparent"
              data-testid={`button-expand-${strategy.id}`}
            >
              <span className="text-primary font-medium">
                {isOpen ? "Show Less" : "View Action Plan"}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-primary" />
              ) : (
                <ChevronDown className="h-4 w-4 text-primary" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-4 border-t">
            {/* All Required Skills */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Required Skills</h4>
              <div className="flex flex-wrap gap-1">
                {strategy.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Steps */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Action Plan</h4>
              <ol className="space-y-2">
                {strategy.steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex gap-2">
              <ProgressTracker 
                strategyId={strategy.id} 
                strategyTitle={strategy.title}
              />
              <Button 
                className="flex-1"
                data-testid={`button-start-${strategy.id}`}
                onClick={() => console.log(`Starting strategy: ${strategy.title}`)}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}