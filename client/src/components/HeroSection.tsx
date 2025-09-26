import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Success_growth_hero_image_6a85d5f2.png";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(36, 62, 99, 0.8), rgba(16, 185, 129, 0.6)), url(${heroImage})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container py-24 md:py-32">
        <div className="flex flex-col items-center text-center text-white space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <TrendingUp className="h-4 w-4 text-green-300" />
            <span className="text-sm font-medium">20 Proven Strategies</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            Make <span className="text-green-300">$100k</span> in the
            <br />Next 12 Months
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            Discover proven strategies from high-paying jobs to profitable business ventures. 
            Each path includes realistic timelines, required skills, and step-by-step action plans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-green-600 hover:bg-green-700 text-white border-green-500 text-lg px-8 py-3"
              data-testid="button-get-started"
            >
              Explore Strategies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-3"
              data-testid="button-learn-more"
            >
              Learn How It Works
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">20+</div>
              <div className="text-sm text-white/80">Strategies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">$100k+</div>
              <div className="text-sm text-white/80">Potential Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">12</div>
              <div className="text-sm text-white/80">Months Timeline</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}