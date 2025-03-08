
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Cloud, BarChart4 } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 animated-gradient opacity-60"></div>
      <div className="absolute top-40 -left-20 w-64 h-64 bg-leaf-200/30 dark:bg-leaf-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-soil-200/30 dark:bg-soil-900/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Text Content */}
          <div className={cn(
            'space-y-8 transition-all duration-700 ease-out',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-leaf-100 dark:bg-leaf-900/50 border border-leaf-200 dark:border-leaf-800 text-leaf-800 dark:text-leaf-300 text-sm font-medium">
              <span className="animate-pulse mr-2">●</span> 
              Transforming Agriculture with AI
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-primary">Smart Farming</span> for a Sustainable Future
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-xl">
              AgriGenius combines AI technology with agricultural expertise to deliver personalized crop recommendations, real-time disease detection, and data-driven insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full">
                Start Growing Smarter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-full">
                Explore Features
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {[
                { icon: Leaf, label: "Crop Recommendations", desc: "AI-powered suggestions" },
                { icon: Cloud, label: "Weather Insights", desc: "Real-time forecasting" },
                { icon: BarChart4, label: "Yield Analysis", desc: "Data-driven farming" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 transition-all duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-leaf-100 dark:bg-leaf-900/50 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.label}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image/Visualization */}
          <div className={cn(
            'relative transition-all duration-1000 ease-out',
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-leaf-100/80 to-sky-100/80 dark:from-leaf-900/80 dark:to-sky-900/80 backdrop-blur-sm border border-white/20 dark:border-white/5 rounded-2xl shadow-xl"></div>
              
              {/* Interactive 3D element placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 aspect-square rounded-full bg-white/20 dark:bg-black/20 animate-float shadow-lg backdrop-blur-sm flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-1/2 h-1/2 text-leaf-600 dark:text-leaf-400"
                  >
                    <path 
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M12 6C7 6 3 12 3 12C3 12 7 18 12 18C17 18 21 12 21 12C21 12 17 6 12 6Z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-soil-300 dark:bg-soil-700 rounded-full animate-float" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-leaf-400 dark:bg-leaf-600 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-sky-300 dark:bg-sky-700 rounded-full animate-float" style={{ animationDelay: '0.8s' }}></div>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass rounded-xl p-4 flex items-center space-x-6 shadow-xl max-w-sm w-full">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">92%</span>
                <span className="text-xs text-foreground/70">Accuracy</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">50+</span>
                <span className="text-xs text-foreground/70">Crop Types</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">24/7</span>
                <span className="text-xs text-foreground/70">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
