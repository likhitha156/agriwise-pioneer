
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { GitBranch, Heart, Twitter, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-gradient opacity-30"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <AnimatedLogo size="md" />
              <span className="font-display text-2xl font-semibold">AgriGenius</span>
            </div>
            <p className="text-foreground/70">
              Revolutionizing agriculture with AI-powered insights and sustainable farming practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary/50 transition-colors">
                <Twitter className="w-5 h-5 text-foreground/70" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary/50 transition-colors">
                <Facebook className="w-5 h-5 text-foreground/70" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary/50 transition-colors">
                <Instagram className="w-5 h-5 text-foreground/70" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary/50 transition-colors">
                <Linkedin className="w-5 h-5 text-foreground/70" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Features', 'Pricing', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <ul className="space-y-4">
              {['AI Chatbot', 'Crop Recommendations', 'Pest Detection', 'Weather Forecasts', 'Market Insights', 'IoT Integration'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground/70">123 Farm Avenue, Agricity</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground/70">support@agrigenius.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground/70">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {currentYear} AgriGenius. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies Settings</a>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
              <span>by</span>
              <a href="#" className="text-primary hover:underline flex items-center">
                <span>Lovable</span>
                <GitBranch className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
