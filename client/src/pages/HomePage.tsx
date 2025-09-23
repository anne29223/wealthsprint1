import { useState, useMemo } from "react";
import { mockStrategies } from "@/data/strategies";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import StrategiesGrid from "@/components/StrategiesGrid";
import Footer from "@/components/Footer";
import type { IncomeStrategy } from "@shared/schema";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter strategies based on search and category
  const filteredStrategies = useMemo(() => {
    let filtered = mockStrategies;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(strategy => strategy.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(strategy => 
        strategy.title.toLowerCase().includes(query) ||
        strategy.description.toLowerCase().includes(query) ||
        strategy.requiredSkills.some(skill => skill.toLowerCase().includes(query)) ||
        strategy.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleGetStarted = () => {
    // Scroll to strategies section
    const strategiesSection = document.getElementById('strategies');
    if (strategiesSection) {
      strategiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showMobileFilters={showMobileFilters}
        onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
      />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        
        <StatsSection strategies={mockStrategies} />
        
        <section id="strategies" className="py-12">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-2">
                Choose Your Path to $100k
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each strategy includes realistic income projections, required skills, startup costs, 
                and step-by-step action plans to help you succeed.
              </p>
            </div>
            
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {filteredStrategies.length} of {mockStrategies.length} strategies
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-primary hover:underline text-sm"
                  data-testid="button-clear-filters"
                >
                  Clear filters
                </button>
              )}
            </div>
            
            <StrategiesGrid strategies={filteredStrategies} />
            
            {filteredStrategies.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No strategies match your current filters.
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-primary hover:underline"
                  data-testid="button-reset-filters"
                >
                  Reset filters to see all strategies
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}