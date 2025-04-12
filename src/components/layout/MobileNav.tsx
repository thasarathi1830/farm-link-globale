
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
  const [open, setOpen] = React.useState(false);
  // Mock authentication state for demo purposes
  const isAuthenticated = false;

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-4">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </nav>
          
          <div className="border-t pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
                <Link 
                  to="/dashboard" 
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={handleLinkClick}
                >
                  Profile
                </Link>
                <Button variant="outline">
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={handleLinkClick}>Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register" onClick={handleLinkClick}>Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
