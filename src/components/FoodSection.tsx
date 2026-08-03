import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Leaf, Utensils, Calendar, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FoodItem, Language, Currency } from '../types';
import { currencySymbols, conversionRates } from '../data';

interface FoodSectionProps {
  foodItems: FoodItem[];
  activeLang: Language;
  activeCurrency: Currency;
}

export default function FoodSection({ foodItems, activeLang, activeCurrency }: FoodSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'dish' | 'drink'>('all');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resGuests, setResGuests] = useState(2);
  const [isReserved, setIsReserved] = useState(false);
  const [resName, setResName] = useState('');

  // Currency Converter
  const formatPrice = (usd: number) => {
    const converted = usd * conversionRates[activeCurrency];
    return `${currencySymbols[activeCurrency]}${Math.round(converted).toLocaleString()}`;
  };

  // Filtered items
  const filteredItems = foodItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resDate || !resTime || !resName) return;
    setIsReserved(true);
  };

  return (
    <div id="culinary-section" className="space-y-10">
      
      {/* Category Tabs */}
      <div className="flex justify-center gap-2">
        {(['all', 'dish', 'drink'] as const).map((tab) => (
          <button
            key={tab}
            id={`tab-food-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer border ${
              activeTab === tab
                ? 'bg-heritage-gold border-heritage-gold text-earth-dark font-bold shadow-lg shadow-heritage-gold/15'
                : 'border-white/10 bg-earth-clay/30 hover:bg-earth-clay/50 text-gray-400 hover:text-earth-sand'
            }`}
          >
            {tab === 'all' ? 'Full Feast' : tab === 'dish' ? 'Traditional Mains' : 'Heritage Drinks'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Food Items Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-earth-clay/70 border border-heritage-gold/10 hover:border-heritage-gold/25 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Image container */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name[activeLang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Badge container */}
                    <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                      {item.isSpicy && (
                        <div className="bg-heritage-red/90 text-white p-1.5 rounded-lg flex items-center justify-center shadow-md border border-white/15" title="Spicy Berbere Sauce">
                          <Flame className="w-3.5 h-3.5 fill-white text-white" />
                        </div>
                      )}
                      {item.isVegetarian && (
                        <div className="bg-heritage-green/90 text-white p-1.5 rounded-lg flex items-center justify-center shadow-md border border-white/15" title="Fasting / Vegan friendly">
                          <Leaf className="w-3.5 h-3.5 fill-white text-white" />
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 bg-earth-dark/95 border border-heritage-gold/20 px-3 py-1 rounded-lg">
                      <span className="font-mono text-xs text-heritage-gold font-bold">{formatPrice(item.priceUsd)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-earth-sand font-bold mb-1.5 group-hover:text-heritage-gold transition-colors">
                    {item.name[activeLang]}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {item.description[activeLang]}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-heritage-gold/80">
                    {item.type === 'dish' ? 'Melt-in-mouth Entrée' : 'Aromatic Aperitif'}
                  </span>
                  {item.isVegetarian && (
                    <span className="text-[9px] font-sans font-medium text-heritage-green-light bg-heritage-gold-light/40 px-2 py-0.5 rounded-full border border-heritage-gold/20">
                      Tsom (Lenten Vegan)
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Column: Table Reservation Form Card */}
        <div className="lg:col-span-4 bg-earth-clay/90 border border-heritage-gold/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-gold/5 rounded-full filter blur-2xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 habesha-pattern pointer-events-none" />

          {!isReserved ? (
            <form onSubmit={handleReserve} className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-heritage-gold/10">
                <Utensils className="w-5 h-5 text-heritage-gold" />
                <h3 className="text-lg font-serif text-earth-sand font-bold">Gursha Table Reservation</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Reserve your dining circle at our award-winning luxury restaurant. Participate in our interactive live coffee roasting rituals.
              </p>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Full Name</label>
                <input
                  id="reserve-name"
                  type="text"
                  required
                  placeholder="Catherine Dupont"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  className="w-full bg-earth-dark border border-heritage-gold/15 focus:border-heritage-gold text-earth-sand text-xs rounded-xl px-4 py-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Dining Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="reserve-date"
                      type="date"
                      required
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full bg-earth-dark border border-heritage-gold/15 focus:border-heritage-gold text-earth-sand text-[10px] rounded-xl pl-9 pr-2 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Seating Time</label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="reserve-time"
                      type="time"
                      required
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-earth-dark border border-heritage-gold/15 focus:border-heritage-gold text-earth-sand text-[10px] rounded-xl pl-9 pr-2 py-2 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Table For (Guests)</label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="reserve-guests"
                    type="number"
                    min="1"
                    max="12"
                    value={resGuests}
                    onChange={(e) => setResGuests(parseInt(e.target.value) || 2)}
                    className="w-full bg-earth-dark border border-heritage-gold/15 focus:border-heritage-gold text-earth-sand text-xs rounded-xl pl-9 pr-3 py-2 outline-none"
                  />
                </div>
              </div>

              <button
                id="btn-reserve-table"
                type="submit"
                className="w-full bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-xs py-3 rounded-xl transition-all duration-300 shadow-md shadow-heritage-gold/5 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                Secure My Table
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[9px] font-mono text-center text-gray-400">
                Traditional Habesha dance performances nightly starting 7:30 PM.
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 relative z-10">
              <div className="mx-auto w-12 h-12 bg-heritage-green/20 rounded-full flex items-center justify-center border border-heritage-gold/30">
                <CheckCircle2 className="w-6 h-6 text-heritage-gold" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-earth-sand">Gursha Table Confirmed!</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Excellent, <span className="text-heritage-gold font-bold">{resName}</span>. Your royal seating for <span className="text-heritage-gold font-bold">{resGuests} guests</span> on <span className="text-heritage-gold font-bold">{resDate}</span> at <span className="text-heritage-gold font-bold">{resTime}</span> is officially guaranteed.
                </p>
              </div>
              <button
                id="btn-reserve-another"
                onClick={() => {
                  setIsReserved(false);
                  setResName('');
                  setResDate('');
                  setResTime('');
                }}
                className="text-xs text-heritage-gold underline hover:text-heritage-gold/80 font-mono cursor-pointer"
              >
                Book another table
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
