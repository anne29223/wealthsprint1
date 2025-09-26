import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import StrategiesGrid from "@/components/StrategiesGrid";
import Footer from "@/components/Footer";
import type { IncomeStrategy } from "@shared/schema";

// API function to fetch strategies
const fetchStrategies = async (category?: string, search?: string): Promise<IncomeStrategy[]> => {
  const params = new URLSearchParams();
  if (category && category !== "all") params.append("category", category);
  if (search?.trim()) params.append("search", search.trim());
  
  const response = await fetch(`/api/strategies?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch strategies");
  }
  return response.json();
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch strategies using React Query
  const { data: strategies = [], isLoading, error } = useQuery({
    queryKey: ['/api/strategies', selectedCategory, searchQuery],
    queryFn: () => fetchStrategies(selectedCategory, searchQuery),
  });

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
        
        <StatsSection strategies={strategies} />
        
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
                {isLoading ? "Loading..." : `Showing ${strategies.length} strategies`}
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
            
            <StrategiesGrid strategies={strategies} loading={isLoading} />
            
            {error && (
              <div className="text-center py-12">
                <div className="text-destructive mb-4">
                  Error loading strategies. Please try again.
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="text-primary hover:underline"
                  data-testid="button-retry"
                >
                  Retry
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