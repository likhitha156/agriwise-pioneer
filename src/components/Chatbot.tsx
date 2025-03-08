
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedLogo from './AnimatedLogo';
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AgriGenius assistant. How can I help you with your farming needs today?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Auto-send the voice message
        setTimeout(() => {
          handleSendVoiceMessage(transcript);
        }, 500);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Could not recognize speech: ${event.error}`,
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendVoiceMessage = (transcript: string) => {
    if (transcript.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: transcript,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on your soil type and climate, I recommend planting tomatoes, peppers, or eggplants in your region this season.",
        "I've analyzed your crop data. For optimal yield, consider applying nitrogen-rich fertilizer at 40% of the usual rate, given your soil's current composition.",
        "Your plant appears to have early signs of powdery mildew. I recommend a solution of 1 tablespoon baking soda, 1/2 teaspoon liquid soap, and 1 gallon of water as an eco-friendly treatment.",
        "Weather forecasts indicate a 70% chance of frost in your area next week. I suggest covering sensitive crops or delaying planting until after this cold spell passes.",
        "Based on current market trends, your harvest might fetch 15% higher prices if you wait 2 weeks before selling. Would you like me to set a reminder to alert you at the optimal selling time?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    handleSendVoiceMessage(input);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser does not support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now to send a message.",
        });
      } catch (error) {
        console.error('Speech recognition error', error);
        toast({
          title: "Voice Recognition Error",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <section id="chatbot" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            AI Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your 24/7 Farming Expert</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Ask any agricultural questions and get personalized advice based on cutting-edge AI technology and agricultural expertise.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card overflow-hidden h-[600px] flex flex-col">
          <div className="p-4 border-b bg-background/50 flex items-center">
            <AnimatedLogo size="sm" className="mr-3" />
            <div>
              <h3 className="font-semibold">AgriGenius Assistant</h3>
              <p className="text-xs text-foreground/60">Agricultural AI expert</p>
            </div>
            <div className="ml-auto flex items-center">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-leaf-100 dark:bg-leaf-900 text-leaf-800 dark:text-leaf-300 text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Online
              </span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-background/40">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex items-start max-w-[85%] animate-slide-up",
                    message.sender === 'user' ? 'ml-auto' : ''
                  )}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <AnimatedLogo size="sm" />
                    </div>
                  )}
                  <div 
                    className={cn(
                      "rounded-xl px-4 py-3",
                      message.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-muted rounded-tl-none'
                    )}
                  >
                    {message.content}
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-soil-200 flex items-center justify-center ml-2">
                      <span className="text-soil-600 font-medium">You</span>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-start max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <AnimatedLogo size="sm" />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-muted rounded-tl-none flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-4 border-t bg-background/50">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about crops, pests, weather, or techniques..."
                disabled={loading || isListening}
                className="flex-1"
              />
              <Button 
                onClick={toggleListening}
                variant={isListening ? "destructive" : "secondary"}
                className={cn(
                  "px-3 transition-all duration-300",
                  isListening && "animate-pulse"
                )}
                disabled={loading}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                onClick={handleSend} 
                className="bg-primary hover:bg-primary/90"
                disabled={loading || input.trim() === ''}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
