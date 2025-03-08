
import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { MessageSquare, Leaf, AlertTriangle, BarChart4, Cloud, Cpu } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8');
      el.classList.remove('animate-slide-up', 'opacity-100');
      observer.observe(el);
    });
    
    return () => {
      featureElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const features: Feature[] = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chatbot",
      description: "Ask farming questions and receive instant AI guidance tailored to your specific needs and location.",
      color: "bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400",
    },
    {
      icon: Leaf,
      title: "Smart Crop Recommendations",
      description: "Get data-driven suggestions for optimal crops based on your soil type, climate conditions, and historical yield data.",
      color: "bg-leaf-100 dark:bg-leaf-900 text-leaf-600 dark:text-leaf-400",
    },
    {
      icon: AlertTriangle,
      title: "Pest & Disease Detection",
      description: "Upload photos of your plants for instant identification of pests and diseases, with eco-friendly treatment recommendations.",
      color: "bg-soil-100 dark:bg-soil-900 text-soil-600 dark:text-soil-400",
    },
    {
      icon: BarChart4,
      title: "Yield Analysis",
      description: "Track and analyze your farm's performance over time with detailed insights and improvement suggestions.",
      color: "bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400",
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description: "Access hyper-local weather forecasts and receive alerts for adverse conditions that might affect your crops.",
      color: "bg-leaf-100 dark:bg-leaf-900 text-leaf-600 dark:text-leaf-400",
    },
    {
      icon: Cpu,
      title: "IoT Compatibility",
      description: "Connect with smart farming devices to automate irrigation, monitoring, and data collection across your farm.",
      color: "bg-soil-100 dark:bg-soil-900 text-soil-600 dark:text-soil-400",
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6" ref={featuresRef}>
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            Our Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Smart Features for Modern Farming</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            AgriGenius combines cutting-edge AI technology with agricultural expertise to help you maximize yields while practicing sustainable farming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card glass-card transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", feature.color)}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
