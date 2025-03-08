
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, Thermometer, Droplets, Mountain } from "lucide-react";

interface CropSuggestion {
  name: string;
  confidence: number;
  description: string;
  icon: string;
}

const CropRecommendation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([]);
  const [formValues, setFormValues] = useState({
    location: '',
    soilType: '',
    temperature: '',
    rainfall: '',
    landSize: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const mockSuggestions: CropSuggestion[] = [
        {
          name: "Tomatoes",
          confidence: 92,
          description: "Thrives in your soil conditions with high market value. Requires moderate watering and full sun exposure.",
          icon: "🍅"
        },
        {
          name: "Sweet Corn",
          confidence: 87,
          description: "Well-suited for your climate zone with good yield potential. Plant in blocks for proper pollination.",
          icon: "🌽"
        },
        {
          name: "Bell Peppers",
          confidence: 81,
          description: "Excellent choice for your temperature range. Add calcium to prevent blossom end rot.",
          icon: "🫑"
        },
        {
          name: "Kale",
          confidence: 76,
          description: "Hardy crop that can withstand temperature fluctuations in your region. Rich in nutrients.",
          icon: "🥬"
        }
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 2000);
  };

  return (
    <section id="crop-recommendation" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-leaf-50/50 to-transparent dark:from-leaf-950/30 dark:to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              AI Recommendations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Smart Crop Suggestions For Your Land
            </h2>
            <p className="text-foreground/70 mb-8">
              Our AI analyzes your specific conditions including soil composition, climate patterns, and local market trends to recommend the most profitable and sustainable crops for your farm.
            </p>
            
            <div className="space-y-6 glass-card">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <Input 
                        id="location"
                        name="location"
                        placeholder="Enter your location"
                        value={formValues.location}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select onValueChange={(value) => handleSelectChange('soilType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="chalk">Chalk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Avg. Temperature (°C)</Label>
                    <div className="relative">
                      <Input 
                        id="temperature"
                        name="temperature"
                        type="number"
                        placeholder="e.g., 25"
                        value={formValues.temperature}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                      <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                    <div className="relative">
                      <Input 
                        id="rainfall"
                        name="rainfall"
                        type="number"
                        placeholder="e.g., 750"
                        value={formValues.rainfall}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                      <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (acres)</Label>
                    <div className="relative">
                      <Input 
                        id="landSize"
                        name="landSize"
                        type="number"
                        placeholder="e.g., 5"
                        value={formValues.landSize}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                      <Mountain className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : "Get Crop Recommendations"}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="glass-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-2 h-6 bg-primary rounded-full mr-3"></span>
              Recommended Crops
            </h3>
            
            {suggestions.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium mb-2">No Recommendations Yet</h4>
                <p className="text-muted-foreground max-w-xs">
                  Fill out the form with your land details to get AI-powered crop suggestions.
                </p>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center h-80">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Analyzing your conditions...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {suggestions.map((crop, index) => (
                  <div 
                    key={index}
                    className="relative overflow-hidden rounded-xl border border-border p-6 transition-all hover:shadow-md"
                  >
                    <div className="absolute top-0 left-0 h-full w-1 bg-primary" 
                         style={{ opacity: crop.confidence / 100 }}></div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 text-3xl">{crop.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{crop.name}</h4>
                          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                            {crop.confidence}% Match
                          </div>
                        </div>
                        <p className="text-foreground/70 text-sm">{crop.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropRecommendation;
