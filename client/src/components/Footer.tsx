import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-8" data-testid="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-lg">
              <span className="text-primary">$100k</span> Strategies
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your comprehensive guide to building wealth through proven income strategies. 
              From high-paying careers to profitable side hustles.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-medium">Popular Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-jobs">High-Paying Jobs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-freelancing">Freelancing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-business">Business Ventures</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-investment">Investment</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-medium">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-getting-started">Getting Started</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-success-stories">Success Stories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-tools">Tools & Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors" data-testid="link-contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 $100k Strategies. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for aspiring entrepreneurs
          </div>
        </div>
      </div>
    </footer>
  );
}