import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Map, Heart, Flame, ShieldAlert, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '../types';
import { currencySymbols, conversionRates } from '../data';

interface TravelPlannerProps {
  activeLang: Language;
  onBookPackage: (packageId: string) => void;
}

const vibes = [
  {
    id: 'historical',
    icon: ShieldAlert,
    color: 'text-heritage-gold',
    label: { en: 'Royal & Ancient History', am: 'ጥንታዊ ታሪክ', fr: 'Histoire & Royauté', ar: 'التاريخ القديم' },
    summary: {
      en: 'Focuses on the Northern historic circuit: Axum Obelisks, Lalibela monoliths, Gondar castles, and Lake Tana ancient islands.',
      am: 'በሰሜን ታሪካዊ ቦታዎች ላይ ያተኩራል፡ አክሱም ሃውልቶች፣ ላሊበላ ፍልፍል አብያተ ክርስቲያናት፣ ጎንደር ግንቦች እና ጣና ገዳማት።',
      fr: "Se concentre sur le circuit historique nord: obélisques d'Aksoum, monolithes de Lalibela et châteaux de Gondar.",
      ar: 'يركز على الدائرة التاريخية الشمالية: مسلات أكسوم، وكنائس لاليبيلا، وقلاع غوندار، وجزر تانا الأثرية.'
    }
  },
  {
    id: 'adventure',
    icon: Flame,
    color: 'text-heritage-red',
    label: { en: 'Volcanoes & Safaris', am: 'ጀብዱ እና እሳተ ገሞራ', fr: 'Aventure & Volcans', ar: 'المغامرة والبراكين' },
    summary: {
      en: 'Focuses on raw expeditions: Danakil Depression sulfuric salt lakes, active boiling Erta Ale volcano, and Rift Valley safaris.',
      am: 'በታላላቅ ጉዞዎች ላይ ያተኩራል፡ ዳናኪል ጨው ሐይቅ፣ ንቁ ኤርታ አሌ እሳተ ገሞራ እና የስምጥ ሸለቆ የዱር እንስሳት ጉብኝት።',
      fr: "Axé sur l'aventure pure: dépression du Danakil, volcan Erta Ale en éruption et safaris de la vallée du Rift.",
      ar: 'يركز على البعثات الاستكشافية الوعرة: بحيرات ملح منخفض الدناكل الكبريتية، وبركان إرتا ألي الثائر، وسفاري الوادي المتصدع.'
    }
  },
  {
    id: 'culture',
    icon: Compass,
    color: 'text-heritage-green',
    label: { en: 'Spiritual & Coffee', am: 'ባህልና ቡና ቅምሻ', fr: 'Culturel & Café', ar: 'التراث والقهوة الأصيلة' },
    summary: {
      en: 'Focuses on coffee origins in Kaffa forests, Omo Valley tribes cultural interaction, and spiritual chanting in rock-churches.',
      am: 'በቡና መገኛ ከፋ ጫካዎች፣ በደቡብ የኦሞ ሸለቆ ጎሳዎች ባህል እና በላሊበላ መንፈሳዊ ቅዳሴዎች ላይ ያተኩራል።',
      fr: "Axé sur les origines du café à Kaffa, l'interaction avec les tribus de la vallée de l'Omo et les chants spirituels.",
      ar: 'يركز على موطن القهوة في غابات كافا، والتفاعل الثقافي مع قبائل وادي أومو، والتراتيل الروحية في الكنائس.'
    }
  },
  {
    id: 'honeymoon',
    icon: Heart,
    color: 'text-pink-500',
    label: { en: 'Luxury Honeymoon', am: 'የቅንጦት የጫጉላ ጉዞ', fr: 'Lune de Miel de Luxe', ar: 'شهر العسل الفاخر' },
    summary: {
      en: 'Focuses on luxury forest eco-lodges, private helicopter tours, candlelit crater dinners, and premium wellness spas.',
      am: 'በቅንጦት የጫካ ሪዞርቶች፣ በግል ሄሊኮፕተር ጉዞ፣ በሮማንቲክ እራት እና በቅንጦት ስፓዎች ላይ ያተኩራል።',
      fr: "Axé sur les éco-lodges de luxe en forêt, survols en hélicoptère et dîners romantiques aux chandelles.",
      ar: 'يركز على النزل البيئية الفاخرة وسط الغابات، وجولات الطائرات المروحية الخاصة، وعشاء رومانسي هادئ.'
    }
  }
];

export default function TravelPlanner({ activeLang, onBookPackage }: TravelPlannerProps) {
  const [plannerStep, setPlannerStep] = useState(1);
  const [selectedVibe, setSelectedVibe] = useState('historical');
  const [durationDays, setDurationDays] = useState(7);
  const [hasPlanned, setHasPlanned] = useState(false);

  const activeVibeData = vibes.find(v => v.id === selectedVibe) || vibes[0];

  const handleCreatePlan = () => {
    setHasPlanned(true);
    setPlannerStep(2);
  };

  return (
    <div id="travel-planner-section" className="bg-earth-dark/60 border border-heritage-gold/15 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-heritage-gold/5 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-heritage-green/5 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-6 relative z-10 text-center">
        
        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${plannerStep === 1 ? 'bg-heritage-gold scale-125' : 'bg-gray-600'}`} />
          <span className={`w-8 h-0.5 rounded ${plannerStep === 2 ? 'bg-heritage-gold' : 'bg-gray-600'}`} />
          <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${plannerStep === 2 ? 'bg-heritage-gold scale-125' : 'bg-gray-600'}`} />
        </div>

        {plannerStep === 1 ? (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h3 className="text-xl font-serif text-earth-sand font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-heritage-gold" />
                Curate Your Ethiopian Vibe
              </h3>
              <p className="text-xs text-gray-400">
                Pick your travel aesthetic, define your length of stay, and we will tailor the perfect itinerary layout for you.
              </p>
            </div>

            {/* Vibe Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {vibes.map((v) => {
                const IconComponent = v.icon;
                const isSelected = selectedVibe === v.id;
                return (
                  <button
                    key={v.id}
                    id={`vibe-${v.id}`}
                    onClick={() => setSelectedVibe(v.id)}
                    className={`border rounded-2xl p-4 flex gap-3 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-heritage-gold bg-heritage-gold/5 shadow-md shadow-heritage-gold/5'
                        : 'border-white/10 bg-earth-clay/30 hover:bg-earth-clay/50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-earth-dark ${isSelected ? 'border border-heritage-gold/40' : ''}`}>
                      <IconComponent className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-serif font-semibold text-earth-sand block">
                        {v.label[activeLang]}
                      </span>
                      <p className="text-[10px] text-gray-400 line-clamp-2">
                        {v.summary[activeLang]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slider duration selection */}
            <div className="p-4 bg-earth-clay/50 border border-heritage-gold/10 rounded-2xl text-left space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-400">DURATION OF EXPEDITION</span>
                <span className="text-heritage-gold font-bold">{durationDays} Days / {durationDays - 1} Nights</span>
              </div>
              <input
                id="slider-days"
                type="range"
                min="3"
                max="14"
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value))}
                className="w-full accent-heritage-gold bg-earth-dark h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-gray-500">
                <span>3 Days (Weekend Escape)</span>
                <span>14 Days (Grand Kingdom Tour)</span>
              </div>
            </div>

            <button
              id="btn-generate-custom-plan"
              onClick={handleCreatePlan}
              className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-xs px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-heritage-gold/10 cursor-pointer"
            >
              Draft My Custom Experience
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-heritage-green/25 rounded-full flex items-center justify-center border border-heritage-gold/45">
                <CheckCircle2 className="w-5 h-5 text-heritage-gold" />
              </div>
              <h3 className="text-xl font-serif text-earth-sand font-bold">Your Customized Itinerary Ready</h3>
              <p className="text-xs text-gray-400">Here is the luxurious blueprint suggested for your {selectedVibe} vibe:</p>
            </div>

            {/* Summary display */}
            <div className="bg-earth-clay/80 border border-heritage-gold/15 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <div className="p-2.5 bg-earth-dark border border-heritage-gold/30 rounded-xl">
                  {React.createElement(activeVibeData.icon, { className: `w-5 h-5 ${activeVibeData.color}` })}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-heritage-gold block">RECOMMENDED PACKAGE STYLE</span>
                  <span className="text-sm font-serif font-bold text-earth-sand">{activeVibeData.label[activeLang]}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-bold text-heritage-gold block mb-1">Theme Blueprint:</span>
                  {activeVibeData.summary[activeLang]}
                </div>

                <div className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-bold text-heritage-gold block mb-1">Suggested Dynamic Days:</span>
                  <ul className="space-y-1 font-mono text-[11px] text-gray-400">
                    <li>• Day 1-2: VIP airport transfer to your luxury traditional Habesha Suite. Historic local walking tours.</li>
                    <li>• Day 3-{Math.floor(durationDays / 2) + 1}: Custom private helicopter or 4x4 transfers to regional highlights with private historians.</li>
                    <li>• Day {Math.floor(durationDays / 2) + 2}-{durationDays - 1}: Interactive culinary workshops, organic forest coffee ceremonies, and nightly cultural dances.</li>
                    <li>• Day {durationDays}: Elegant checkout, private departure transfers.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-heritage-gold/10 pt-4 mt-2">
              <button
                id="btn-back-planner"
                onClick={() => setPlannerStep(1)}
                className="text-xs text-gray-400 hover:text-earth-sand font-mono underline cursor-pointer"
              >
                ← Reselect Vibe & Duration
              </button>
              
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  id="btn-planner-chat-buna"
                  onClick={() => {
                    const el = document.getElementById('ai-concierge-launcher');
                    if (el) el.click();
                  }}
                  className="bg-earth-clay hover:bg-earth-clay/80 text-heritage-gold font-sans border border-heritage-gold/30 font-semibold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer text-center"
                >
                  Discuss on AI Chat
                </button>
                <button
                  id="btn-planner-book-package"
                  onClick={() => onBookPackage(selectedVibe === 'adventure' ? 'adventure-depression' : selectedVibe === 'culture' ? 'cultural-coffee' : 'historical-north')}
                  className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-heritage-gold/10 text-center cursor-pointer"
                >
                  Instantly Book Stay
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
