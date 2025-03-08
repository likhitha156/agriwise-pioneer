
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud, AlertTriangle, Loader2, CheckCircle2, Camera, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetectionResult {
  type: 'pest' | 'disease';
  name: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

const PestDetection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setResult(null);
    
    // Simulate API request
    setTimeout(() => {
      const mockResults: DetectionResult[] = [
        {
          type: 'pest',
          name: 'Aphids',
          confidence: 89,
          description: 'Small sap-sucking insects that can cause stunted growth and deformation of leaves and shoots.',
          treatment: 'Release ladybugs as natural predators or spray with neem oil solution (2 tbsp neem oil, 1 tsp mild liquid soap, 1 gallon water).',
          severity: 'medium'
        },
        {
          type: 'disease',
          name: 'Powdery Mildew',
          confidence: 94,
          description: 'Fungal disease that appears as white powdery spots on leaves and stems, causing leaf yellowing and plant weakness.',
          treatment: 'Improve air circulation, apply potassium bicarbonate spray, or use milk spray (1 part milk to 9 parts water) as an organic solution.',
          severity: 'high'
        },
        {
          type: 'pest',
          name: 'Tomato Hornworm',
          confidence: 92,
          description: 'Large green caterpillars that feed on tomato plants, causing extensive defoliation.',
          treatment: 'Handpick and remove the caterpillars or apply Bacillus thuringiensis (Bt), a natural microbial insecticide.',
          severity: 'high'
        },
        {
          type: 'disease',
          name: 'Leaf Spot',
          confidence: 87,
          description: 'Fungal disease causing circular spots with dark borders on leaves, which may turn yellow and drop prematurely.',
          treatment: 'Remove affected leaves, improve air circulation, and apply copper-based fungicide for severe cases.',
          severity: 'medium'
        }
      ];
      
      // Randomly select one result
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setUploading(false);
    }, 2500);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300';
      case 'medium':
        return 'bg-soil-100 text-soil-800 dark:bg-soil-900 dark:text-soil-300';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <section id="pest-detection" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-l from-soil-50/50 to-transparent dark:from-soil-950/30 dark:to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-soil-100 dark:bg-soil-900 border border-soil-200 dark:border-soil-800 text-soil-800 dark:text-soil-300 text-sm font-medium mb-4">
              AI Detection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Identify Pests & Diseases Instantly
            </h2>
            <p className="text-foreground/70 mb-8">
              Upload an image of your plants and our AI will quickly detect pests or diseases affecting them, along with providing eco-friendly treatment recommendations.
            </p>
            
            <div 
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
                dragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
                preview ? "border-primary/50" : ""
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!preview ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Upload Plant Image</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Drag & drop your image here or click to browse
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Browse Files
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div className="space-y-6">
                  <div className="relative w-full max-w-sm mx-auto">
                    <img 
                      src={preview} 
                      alt="Plant preview" 
                      className="w-full h-auto max-h-80 object-contain rounded-lg" 
                    />
                    {result && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium border border-primary/20">
                        {result.confidence}% Confidence
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      disabled={uploading}
                    >
                      Change Image
                    </Button>
                    {!result && !uploading && (
                      <Button 
                        className="bg-primary hover:bg-primary/90" 
                        onClick={handleUpload}
                      >
                        Analyze Image
                      </Button>
                    )}
                    {uploading && (
                      <Button disabled>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="glass-card h-full">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-2 h-6 bg-soil-500 rounded-full mr-3"></span>
              Detection Results
            </h3>
            
            {!result && !uploading ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium mb-2">No Results Yet</h4>
                <p className="text-muted-foreground max-w-xs">
                  Upload and analyze a plant image to receive pest and disease detection results.
                </p>
              </div>
            ) : uploading ? (
              <div className="flex flex-col items-center justify-center h-80">
                <Loader2 className="h-12 w-12 text-soil-500 animate-spin mb-4" />
                <p className="text-muted-foreground">Analyzing your plant image...</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2",
                    result.type === 'pest' 
                      ? 'bg-soil-100 text-soil-800 dark:bg-soil-900 dark:text-soil-300' 
                      : 'bg-leaf-100 text-leaf-800 dark:bg-leaf-900 dark:text-leaf-300'
                  )}>
                    {result.type === 'pest' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    {result.type === 'pest' ? 'Pest Detected' : 'Disease Detected'}
                  </div>
                  <div className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium",
                    getSeverityColor(result.severity)
                  )}>
                    {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-2">{result.name}</h4>
                  <p className="text-foreground/70 mb-4">{result.description}</p>
                </div>
                
                <div className="glass border border-border rounded-xl p-4">
                  <h5 className="font-semibold mb-2 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                    Recommended Treatment
                  </h5>
                  <p className="text-foreground/70">{result.treatment}</p>
                </div>
                
                <Button 
                  className="w-full"
                  variant="outline"
                >
                  View Detailed Report
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PestDetection;
