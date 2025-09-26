import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";
import { categories, type Category } from "@shared/schema";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showMobileFilters: boolean;
  onToggleMobileFilters: () => void;
}

export default function Header({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  showMobileFilters,
  onToggleMobileFilters
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-display font-semibold text-foreground">
            <span className="text-primary">$100k</span> Strategies
          </h1>
        </div>
        
        {/* Desktop Search and Filters */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search strategies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange("all")}
              data-testid="filter-all"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleMobileFilters}
            data-testid="button-mobile-filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <ThemeToggle />
      </div>

      {/* Mobile Search and Filters */}
      {showMobileFilters && (
        <div className="md:hidden border-t p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search strategies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
              data-testid="input-search-mobile"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer hover-elevate"
              onClick={() => onCategoryChange("all")}
              data-testid="filter-mobile-all"
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover-elevate"
                onClick={() => onCategoryChange(category)}
                data-testid={`filter-mobile-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}