
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Mic, MicOff, Image, Paperclip, File } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedLogo from './AnimatedLogo';
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';

interface Attachment {
  id: string;
  type: 'image' | 'document';
  name: string;
  url: string;
  file: File;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  attachments?: Attachment[];
}

const Chatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('chatbot.welcome'),
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: t('chatbot.welcome'),
        sender: 'bot'
      }
    ]);
  }, [i18n.language, t]);

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
      recognitionRef.current.lang = i18n.language === 'en' ? 'en-US' : 
                                   i18n.language === 'es' ? 'es-ES' : 
                                   'fr-FR';

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
          title: t('chatbot.voiceError'),
          description: `${t('chatbot.tryAgain')}: ${event.error}`,
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
  }, [i18n.language, t]);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = i18n.language === 'en' ? 'en-US' : 
                                   i18n.language === 'es' ? 'es-ES' : 
                                   'fr-FR';
    }
  }, [i18n.language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendVoiceMessage = (transcript: string) => {
    if (transcript.trim() === '' && attachments.length === 0) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: transcript,
      sender: 'user',
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachments([]);
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
    if (input.trim() === '' && attachments.length === 0) return;
    handleSendVoiceMessage(input);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: t('chatbot.voiceError'),
        description: t('chatbot.voiceNotSupported'),
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
          title: t('chatbot.listening'),
          description: t('chatbot.speakNow'),
        });
      } catch (error) {
        console.error('Speech recognition error', error);
        toast({
          title: t('chatbot.voiceError'),
          description: t('chatbot.tryAgain'),
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newAttachments: Attachment[] = Array.from(files).map(file => {
      const isImage = file.type.startsWith('image/');
      const id = Date.now().toString() + Math.random().toString().slice(2, 8);
      const url = URL.createObjectURL(file);
      
      return {
        id,
        type: isImage ? 'image' : 'document',
        name: file.name,
        url,
        file
      };
    });
    
    setAttachments(prev => [...prev, ...newAttachments]);
    toast({
      title: t('chatbot.fileAttached'),
      description: `${files.length} ${files.length === 1 ? t('chatbot.fileAttachedSingular') : t('chatbot.fileAttachedPlural')}`,
    });
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="chatbot" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            AI Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('chatbot.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t('chatbot.description')}
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
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map(attachment => (
                          <div key={attachment.id} className="rounded-md overflow-hidden">
                            {attachment.type === 'image' ? (
                              <img 
                                src={attachment.url} 
                                alt={attachment.name} 
                                className="max-h-40 rounded-md object-contain bg-black/5"
                              />
                            ) : (
                              <a 
                                href={attachment.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
                              >
                                <File className="h-4 w-4 mr-2" />
                                <span className="text-sm truncate max-w-[200px]">{attachment.name}</span>
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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
                    <span>{t('chatbot.thinking')}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {attachments.length > 0 && (
            <div className="p-2 border-t bg-background/70">
              <div className="flex flex-wrap gap-2">
                {attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-1 bg-background/70 rounded-md p-1 pr-2 border">
                    {attachment.type === 'image' ? (
                      <div className="h-6 w-6 rounded-sm overflow-hidden mr-1">
                        <img src={attachment.url} alt={attachment.name} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <File className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs truncate max-w-[100px]">{attachment.name}</span>
                    <button 
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-red-500 hover:text-red-700 ml-1 rounded-full h-4 w-4 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-4 border-t bg-background/50">
            <div className="flex items-center space-x-2">
              <input 
                type="file" 
                multiple 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
              />
              <Button
                onClick={handleAttachClick}
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                title={t('chatbot.attach')}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chatbot.inputPlaceholder')}
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
                title={isListening ? t('chatbot.voiceStop') : t('chatbot.voiceStart')}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                onClick={handleSend} 
                className="bg-primary hover:bg-primary/90"
                disabled={loading || (input.trim() === '' && attachments.length === 0)}
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
