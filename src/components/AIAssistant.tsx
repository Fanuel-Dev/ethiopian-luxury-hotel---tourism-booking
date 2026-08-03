import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Coffee, Map, Utensils, HelpCircle, Loader2 } from 'lucide-react';
import { ChatMessage, Language } from '../types';

interface AIAssistantProps {
  activeLang: Language;
}

const suggestedPrompts = [
  {
    icon: Map,
    label: {
      en: "4-Day Lalibela Itinerary",
      am: "የ4 ቀን የላሊበላ የጉዞ እቅድ",
      fr: "Itinéraire de 4 Jours à Lalibela",
      ar: "مسار لاليبيلا لمدة ٤ أيام"
    },
    text: "Can you design a 4-day premium itinerary for Lalibela including stays and traditional music?"
  },
  {
    icon: Coffee,
    label: {
      en: "Coffee Ceremony Etiquette",
      am: "የቡና ስነ-ስርዓት ስነ-ምግባር",
      fr: "Étiquette du Café",
      ar: "بروتوكول طقوس القهوة الإثيوبية"
    },
    text: "What is the traditional etiquette and steps during an authentic Ethiopian coffee ceremony?"
  },
  {
    icon: Utensils,
    label: {
      en: "Traditional Food Guide",
      am: "የባህላዊ ምግቦች መመሪያ",
      fr: "Guide des Plats Éthiopiens",
      ar: "دليل المأكولات الإثيوبية التقليدية"
    },
    text: "Can you recommend a premium tasting menu for Habesha cuisine including Doro Wat, Kitfo and Tej?"
  }
];

export default function AIAssistant({ activeLang }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Selam! Tena Yistilign (ጤና ይስጥልኝ). Welcome, distinguished guest. I am 'Buna', your luxury Ethiopian travel companion and concierge. How can I curate your dream vacation, draft custom itineraries, or guide you through our ancient culture today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        sender: 'assistant',
        text: data.text || "Forgive me, my connection is experiencing a brief pause. Please try again soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: ChatMessage = {
        id: "error-" + Date.now(),
        sender: 'assistant',
        text: "I apologize, I was unable to connect to the central reservation office. Please verify the environment settings and try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        id="ai-concierge-launcher"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark p-4 rounded-full shadow-2xl flex items-center gap-2 font-serif font-bold group border border-earth-dark/10 cursor-pointer"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 animate-pulse text-earth-dark" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-heritage-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-heritage-red"></span>
          </span>
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-500 ease-out whitespace-nowrap text-xs font-sans tracking-wider uppercase">
          AI Travel Concierge
        </span>
      </motion.button>

      {/* Chat sliding drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Chat Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-[460px] h-full bg-earth-dark border-l border-heritage-gold/15 shadow-2xl relative z-10 flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-heritage-gold/10 bg-earth-clay flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-heritage-gold/10 border border-heritage-gold/35 rounded-xl">
                    <Sparkles className="w-5 h-5 text-heritage-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-earth-sand font-semibold flex items-center gap-1.5">
                      Buna Concierge
                    </h3>
                    <p className="text-[10px] font-mono tracking-widest text-heritage-gold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Luxury AI Travel Guide
                    </p>
                  </div>
                </div>
                <button
                  id="close-ai-concierge"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-earth-sand transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Panel */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-earth-dark/95 habesha-pattern">
                {messages.map((msg) => {
                  const isAssistant = msg.sender === 'assistant';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-earth-clay text-gray-200 border border-heritage-gold/10'
                          : 'bg-heritage-gold text-earth-dark font-medium shadow-md shadow-heritage-gold/5'
                      }`}>
                        {/* Sender Label */}
                        <div className="flex justify-between items-center mb-1 text-[10px] opacity-60 font-mono tracking-wider">
                          <span>{isAssistant ? "BUNA" : "GUEST"}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-earth-clay border border-heritage-gold/10 rounded-2xl p-4 text-sm text-gray-300 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-heritage-gold animate-spin" />
                      <span className="font-mono text-xs text-heritage-gold uppercase tracking-wider">Buna is writing...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Drawer Options & Input Bar */}
              <div className="p-4 border-t border-heritage-gold/10 bg-earth-clay space-y-4">
                
                {/* Suggestions chips */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" /> Suggested Enquiries:
                    </p>
                    <div className="flex flex-col gap-2">
                      {suggestedPrompts.map((p, idx) => {
                        const IconComponent = p.icon;
                        return (
                          <button
                            key={idx}
                            id={`suggested-prompt-${idx}`}
                            onClick={() => handleSendMessage(p.text)}
                            className="flex items-center gap-2 text-left bg-earth-dark/60 hover:bg-earth-dark border border-heritage-gold/10 hover:border-heritage-gold/30 rounded-xl p-2.5 text-xs text-gray-300 hover:text-earth-sand transition-all duration-300 cursor-pointer"
                          >
                            <IconComponent className="w-4 h-4 text-heritage-gold shrink-0" />
                            <span className="line-clamp-1">{p.label[activeLang]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Send Message Form */}
                <form
                  id="ai-message-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input
                    id="ai-assistant-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Buna about Ethiopian travel..."
                    className="flex-1 bg-earth-dark border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-sm rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-500"
                  />
                  <button
                    id="ai-send-btn"
                    type="submit"
                    className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark p-3 rounded-xl transition-all shadow-lg hover:shadow-heritage-gold/10 cursor-pointer shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
