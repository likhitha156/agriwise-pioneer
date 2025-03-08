
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Crop AI', href: '#crop-recommendation' },
    { name: 'Pest Detection', href: '#pest-detection' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2 group">
          <AnimatedLogo />
          <span className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
            AgriGenius
          </span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Try AI Assistant
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground/80 hover:text-primary"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex flex-col p-6 transition-all duration-300",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex items-center justify-between mb-10">
          <a href="#" className="flex items-center space-x-2">
            <AnimatedLogo />
            <span className="font-display text-xl font-semibold">
              AgriGenius
            </span>
          </a>
          <button 
            className="text-foreground/80 hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 items-center mt-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-primary text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="bg-primary hover:bg-primary/90 text-white w-full mt-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            Try AI Assistant
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
