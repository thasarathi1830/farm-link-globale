
import React from 'react';
import { Link } from 'react-router-dom';
import { Plant } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Plant className="h-5 w-5 text-agrilink-green" />
            <span className="text-lg font-semibold text-agrilink-green">AgriLink</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Connecting farmers, landowners, and corporations
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © 2025 AgriLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
