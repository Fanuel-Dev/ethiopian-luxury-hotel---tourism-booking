import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Compass, Info, ArrowRight } from 'lucide-react';
import { Destination, Language, Currency } from '../types';
import { currencySymbols, conversionRates } from '../data';

interface InteractiveMapProps {
  destinations: Destination[];
  activeLang: Language;
  activeCurrency: Currency;
  onExplore: (destId: string) => void;
}

export default function InteractiveMap({
  destinations,
  activeLang,
  activeCurrency,
  onExplore
}: InteractiveMapProps) {
  const [selectedDest, setSelectedDest] = useState<Destination>(destinations[0]);
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);

  // Exchange calculation helper
  const formatPrice = (usd: number) => {
    const converted = usd * conversionRates[activeCurrency];
    return `${currencySymbols[activeCurrency]}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <div id="interactive-map-section" className="bg-earth-clay border border-heritage-gold/10 rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-heritage-green/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[500px] aspect-[4/3] bg-earth-dark/40 border border-heritage-gold/20 rounded-2xl p-4 relative overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* SVG Grid and Abstract Topographical lines */}
            <div className="absolute inset-0 opacity-15 habesha-pattern pointer-events-none" />
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <path d="M 10 20 Q 30 15, 50 30 T 90 20 T 100 80" fill="none" stroke="#cfa851" strokeWidth="0.5" />
                <path d="M 0 50 Q 20 45, 45 60 T 80 50 T 100 90" fill="none" stroke="#cfa851" strokeWidth="0.5" />
                <circle cx="54" cy="55" r="15" fill="none" stroke="#cfa851" strokeWidth="0.25" strokeDasharray="2 2" />
                <circle cx="54" cy="55" r="30" fill="none" stroke="#cfa851" strokeWidth="0.25" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Stylized borders of Ethiopia (SVG Outline approximation) */}
            <svg
              className="w-[85%] h-[85%] text-heritage-green/20 fill-earth-clay/60 stroke-heritage-gold/30 stroke-2 drop-shadow-[0_0_15px_rgba(207,168,81,0.1)]"
              viewBox="0 0 100 100"
            >
              <polygon
                points="35,12 55,8 70,14 80,25 90,32 95,45 88,60 78,72 65,88 50,92 32,88 20,78 12,65 8,50 15,35 25,22 30,15"
                className="transition-colors duration-500 hover:fill-heritage-green/5"
              />
              
              {/* Nile River flow mock path */}
              <path
                d="M 40 38 Q 30 50, 20 60 T 8 50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-50"
              />
            </svg>

            {/* Map Pin Overlays */}
            {destinations.map((dest) => {
              const isActive = selectedDest.id === dest.id;
              const isHovered = hoveredDest?.id === dest.id;

              return (
                <div
                  key={dest.id}
                  style={{ left: `${dest.coordinates.x}%`, top: `${dest.coordinates.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={() => setSelectedDest(dest)}
                  onMouseEnter={() => setHoveredDest(dest)}
                  onMouseLeave={() => setHoveredDest(null)}
                >
                  {/* Ripple Effect for active pin */}
                  {isActive && (
                    <span className="absolute inline-flex h-8 w-8 rounded-full bg-heritage-gold/30 animate-ping -left-2 -top-2" />
                  )}

                  {/* Pin Dot */}
                  <div
                    className={`p-1.5 rounded-full shadow-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-heritage-gold text-earth-dark scale-125 border-2 border-earth-dark'
                        : isHovered
                        ? 'bg-heritage-red text-earth-sand scale-110'
                        : 'bg-heritage-green text-heritage-gold border border-heritage-gold/40'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Mini floating name tag */}
                  <div
                    className={`absolute left-6 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-heritage-gold text-earth-dark font-semibold opacity-100'
                        : isHovered
                        ? 'bg-earth-dark/90 text-earth-sand border border-heritage-gold/30 opacity-100'
                        : 'bg-transparent text-transparent pointer-events-none'
                    }`}
                  >
                    {dest.name[activeLang]}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-4 font-mono tracking-wide flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-heritage-gold animate-spin-slow" />
            Click on the coordinates map to explore historical & ecological wonders.
          </p>
        </div>

        {/* Right Column: Detailed Glassmorphism Info Panel */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDest.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel-dark border border-heritage-gold/20 rounded-2xl p-6 shadow-xl flex flex-col h-full justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-heritage-gold">
                      {selectedDest.region[activeLang]}
                    </span>
                    <h3 className="text-2xl font-serif text-earth-sand font-semibold mt-1">
                      {selectedDest.name[activeLang]}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-heritage-green/40 border border-heritage-gold/30 px-2.5 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold" />
                    <span className="text-sm font-mono text-heritage-gold font-bold">{selectedDest.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {selectedDest.description[activeLang]}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-heritage-gold mb-3 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-heritage-gold" />
                    Signature Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedDest.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-200 bg-earth-dark/40 border border-white/5 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold" />
                        <span>{hl[activeLang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-heritage-gold/10 pt-4 mt-auto flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block font-mono">ESTIMATED RATE</span>
                  <span className="text-xl font-mono text-heritage-gold font-semibold">
                    {formatPrice(selectedDest.priceUsd)} <span className="text-xs text-gray-400 font-sans">/ guest</span>
                  </span>
                </div>
                <button
                  id={`btn-explore-${selectedDest.id}`}
                  onClick={() => onExplore(selectedDest.id)}
                  className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-medium text-sm px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 hover:translate-x-1 shadow-lg shadow-heritage-gold/15 cursor-pointer"
                >
                  Explore Stays
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
