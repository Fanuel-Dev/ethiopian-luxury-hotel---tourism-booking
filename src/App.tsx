import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass, Heart, Calendar, Users, Check, Flame, MapPin, Coffee,
  Music, Utensils, BookOpen, ChevronLeft, ChevronRight, Star,
  Award, Languages, Menu, X, Bookmark, Phone, Mail, FileText, CheckCircle2,
  Sparkles, ShieldCheck, Globe, CreditCard, Home
} from 'lucide-react';

import { Language, Currency } from './types';
import {
  translations, destinations, rooms, foodItems, tourPackages,
  testimonials, currencySymbols, conversionRates
} from './data';

import InteractiveMap from './components/InteractiveMap';
import AIAssistant from './components/AIAssistant';
import BookingModal from './components/BookingModal';
import FoodSection from './components/FoodSection';
import TravelPlanner from './components/TravelPlanner';

// Generated Asset Paths
const assets = {
  resort: "/src/assets/images/ethiopian_luxury_resort_1782628274155.jpg",
  suite: "/src/assets/images/habesha_luxury_suite_1782628292286.jpg",
  coffee: "/src/assets/images/ethiopian_coffee_ceremony_1782628306640.jpg",
  sunrise: "/src/assets/images/lalibela_sunrise_1782628320871.jpg"
};

const slideshowImages = [
  { url: assets.resort, text: "Luxury Resort overlooking Simien Peaks" },
  { url: assets.sunrise, text: "Breathtaking Sunrise at Lalibela Monoliths" },
  { url: assets.suite, text: "Traditional Habesha Royal Suite Decor" },
  { url: assets.coffee, text: "Authentic Lobby Coffee Ceremony Setup" }
];

const galleryItems = [
  { url: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=600&auto=format&fit=crop", category: "Nature", title: "Lalibela Valley" },
  { url: "https://images.unsplash.com/photo-1622141571731-0cf24cf6dcbe?q=80&w=600&auto=format&fit=crop", category: "Culture", title: "Simien Wildlife" },
  { url: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=600&auto=format&fit=crop", category: "Hotels", title: "Fasil Castle Ground" },
  { url: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600&auto=format&fit=crop", category: "Culture", title: "Traditional Injera Feast" },
  { url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop", category: "Hotels", title: "VIP Tej Lounge" },
  { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop", category: "Nature", title: "Blue Nile Mist" }
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [heroIndex, setHeroIndex] = useState(0);

  // States for Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedRoom, setPreSelectedRoom] = useState<string | undefined>(undefined);
  const [preSelectedTour, setPreSelectedTour] = useState<string | undefined>(undefined);

  // Search Widget values
  const [searchCheckIn, setSearchCheckIn] = useState('');
  const [searchCheckOut, setSearchCheckOut] = useState('');
  const [searchGuests, setSearchGuests] = useState(1);
  const [searchRoomType, setSearchRoomType] = useState(rooms[0]?.id || '');
  const [searchTourType, setSearchTourType] = useState('');

  // Local Wishlist state (persists during page session)
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [bookingsCount, setBookingsCount] = useState(0);

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load translation dict
  const t = translations[lang] || translations.en;

  // Hero slideshow ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Fetch initial wishlist and bookings from Express backend
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const wishRes = await fetch('/api/wishlist');
        const wishData = await wishRes.json();
        if (Array.isArray(wishData)) setWishlist(wishData);

        const bookRes = await fetch('/api/bookings');
        const bookData = await bookRes.json();
        if (Array.isArray(bookData)) setBookingsCount(bookData.length);
      } catch (err) {
        console.warn("Express backend session fetch ignored in preview mode:", err);
      }
    };
    fetchSessionData();
  }, [bookingsCount]);

  // Handle wishlist toggling
  const toggleWishlist = async (id: string) => {
    let updated: string[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter(item => item !== id);
    } else {
      updated = [...wishlist, id];
      // Post to express backend
      try {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      } catch (e) {
        console.warn(e);
      }
    }
    setWishlist(updated);
  };

  // Trigger Booking with preselected fields
  const triggerBooking = (roomId?: string, tourId?: string) => {
    setPreSelectedRoom(roomId);
    setPreSelectedTour(tourId);
    setIsBookingOpen(true);
  };

  // Convert and format currency helper
  const formatPrice = (usd: number) => {
    const converted = usd * conversionRates[currency];
    return `${currencySymbols[currency]}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-earth-dark text-earth-sand font-sans relative overflow-x-hidden">
      
      {/* Decorative Traditional Border Top */}
      <div className="h-2 bg-gradient-to-r from-heritage-green via-heritage-gold to-heritage-red w-full sticky top-0 z-50 shadow-md" />

      {/* Luxury Sticky Navbar */}
      <nav className="sticky top-2 z-40 backdrop-blur-xl bg-earth-dark/80 border-b border-heritage-gold/15 py-4 px-6 md:px-12 flex items-center justify-between shadow-lg">
        
        {/* Brand Logo with crown concept */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-heritage-gold/10 border border-heritage-gold/30 rounded-xl flex items-center justify-center">
            <Compass className="w-6 h-6 text-heritage-gold animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold tracking-tight text-earth-sand">
              LALIBELA
            </h1>
            <span className="text-[9px] font-mono tracking-widest text-heritage-gold block uppercase -mt-1">
              HERITAGE HOTELS & RESORTS
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-gray-300">
          <a href="#hero-section" className="hover:text-heritage-gold transition-colors">{t.nav.home}</a>
          <a href="#destinations-section" className="hover:text-heritage-gold transition-colors">{t.nav.destinations}</a>
          <a href="#rooms-section" className="hover:text-heritage-gold transition-colors">{t.nav.hotels}</a>
          <a href="#culture-section" className="hover:text-heritage-gold transition-colors">{t.nav.culture}</a>
          <a href="#packages-section" className="hover:text-heritage-gold transition-colors">Tours</a>
          <a href="#culinary-section" className="hover:text-heritage-gold transition-colors">Gastronomy</a>
          <a href="#gallery-section" className="hover:text-heritage-gold transition-colors">{t.nav.gallery}</a>
        </div>

        {/* Action Controls & Selectors */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Wishlist Counter */}
          {wishlist.length > 0 && (
            <div className="flex items-center gap-1 bg-heritage-green/30 border border-heritage-gold/20 px-2.5 py-1 rounded-full text-xs font-mono text-heritage-gold" title="Your saved wishlist Stays">
              <Bookmark className="w-3.5 h-3.5 fill-heritage-gold" />
              <span>Saved ({wishlist.length})</span>
            </div>
          )}

          {/* Bookings Counter */}
          {bookingsCount > 0 && (
            <div className="flex items-center gap-1 bg-heritage-red/20 border border-heritage-red/30 px-2.5 py-1 rounded-full text-xs font-mono text-heritage-red" title="Active itinerary reservations">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Booked ({bookingsCount})</span>
            </div>
          )}

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-earth-clay/60 border border-heritage-gold/15 rounded-xl px-2.5 py-1.5 text-xs text-gray-300">
            <Languages className="w-3.5 h-3.5 text-heritage-gold" />
            <select
              id="nav-lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-xs"
            >
              <option value="en" className="bg-earth-dark text-earth-sand">EN</option>
              <option value="am" className="bg-earth-dark text-earth-sand">አማ</option>
              <option value="fr" className="bg-earth-dark text-earth-sand">FR</option>
              <option value="ar" className="bg-earth-dark text-earth-sand">AR</option>
            </select>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-1 bg-earth-clay/60 border border-heritage-gold/15 rounded-xl px-2.5 py-1.5 text-xs text-gray-300">
            <span className="font-bold text-heritage-gold text-xs">{currencySymbols[currency]}</span>
            <select
              id="nav-currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-xs font-mono"
            >
              <option value="USD" className="bg-earth-dark text-earth-sand">USD</option>
              <option value="ETB" className="bg-earth-dark text-earth-sand">ETB</option>
              <option value="EUR" className="bg-earth-dark text-earth-sand">EUR</option>
            </select>
          </div>

          <button
            id="nav-book-stay-btn"
            onClick={() => triggerBooking()}
            className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg hover:shadow-heritage-gold/10 transition-all cursor-pointer"
          >
            {t.bookYourStay}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-heritage-gold hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-earth-clay border-b border-heritage-gold/20 p-5 space-y-4 text-sm font-mono uppercase tracking-wider text-gray-300 sticky top-16 z-35"
          >
            <div className="flex flex-col gap-3">
              <a href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-heritage-gold">{t.nav.home}</a>
              <a href="#destinations-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-heritage-gold">{t.nav.destinations}</a>
              <a href="#rooms-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-heritage-gold">{t.nav.hotels}</a>
              <a href="#culture-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-heritage-gold">{t.nav.culture}</a>
              <a href="#packages-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-heritage-gold">Tours</a>
              <a href="#culinary-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-heritage-gold">Gastronomy</a>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-heritage-gold/10">
              {/* Mobile Language Selector */}
              <div className="flex items-center gap-1 bg-earth-dark border border-heritage-gold/15 rounded-lg px-2 py-1 text-xs">
                <Languages className="w-3 h-3 text-heritage-gold" />
                <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="bg-transparent outline-none">
                  <option value="en" className="bg-earth-dark text-earth-sand">EN</option>
                  <option value="am" className="bg-earth-dark text-earth-sand">አማ</option>
                  <option value="fr" className="bg-earth-dark text-earth-sand">FR</option>
                  <option value="ar" className="bg-earth-dark text-earth-sand">AR</option>
                </select>
              </div>

              {/* Mobile Currency Selector */}
              <div className="flex items-center gap-1 bg-earth-dark border border-heritage-gold/15 rounded-lg px-2 py-1 text-xs">
                <span className="font-bold text-heritage-gold">{currencySymbols[currency]}</span>
                <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="bg-transparent outline-none font-mono">
                  <option value="USD" className="bg-earth-dark text-earth-sand">USD</option>
                  <option value="ETB" className="bg-earth-dark text-earth-sand">ETB</option>
                  <option value="EUR" className="bg-earth-dark text-earth-sand">EUR</option>
                </select>
              </div>
            </div>

            <button
              id="mobile-nav-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                triggerBooking();
              }}
              className="w-full bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold py-3 rounded-xl transition-all block text-center"
            >
              {t.bookYourStay}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION with cinematic imagery */}
      <section id="hero-section" className="relative h-[92vh] overflow-hidden flex items-center justify-center">
        
        {/* Slidewhow background with smooth cross-fades */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0.3, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.3, scale: 0.95 }}
              transition={{ duration: 1.8 }}
              className="absolute inset-0"
            >
              <img
                src={slideshowImages[heroIndex].url}
                alt={slideshowImages[heroIndex].text}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.4]"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Golden gradient filter */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth-dark via-transparent to-earth-dark/40" />
          <div className="absolute inset-0 bg-radial-gradient-to-b from-transparent to-earth-dark/60" />
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-8 select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-heritage-gold bg-heritage-green/45 border border-heritage-gold/30 px-4 py-1.5 rounded-full inline-block animate-pulse">
              ★ Land of Origins Heritage Collection ★
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-earth-sand tracking-tight leading-none drop-shadow-md">
              {t.heroTitle}
            </h2>
            <p className="text-sm md:text-lg text-gray-200/90 max-w-2xl mx-auto leading-relaxed font-sans font-light">
              {t.heroSubtitle}
            </p>
          </motion.div>

          {/* Hero Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <button
              id="hero-book-now"
              onClick={() => triggerBooking()}
              className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-sm px-8 py-4 rounded-xl shadow-2xl hover:shadow-heritage-gold/20 transition-all cursor-pointer"
            >
              {t.bookYourStay}
            </button>
            <a
              href="#destinations-section"
              className="bg-earth-clay/70 hover:bg-earth-clay/90 text-earth-sand font-sans border border-heritage-gold/35 text-sm px-8 py-4 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              {t.exploreEthiopia}
            </a>
          </motion.div>

          {/* Booking Search Widget Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-5xl mx-auto bg-earth-clay/90 border border-heritage-gold/20 rounded-3xl p-5 md:p-6 shadow-2xl relative"
          >
            <div className="absolute inset-0 opacity-5 habesha-pattern pointer-events-none" />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 text-left items-end">
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">{t.bookingWidget.checkIn}</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="search-check-in"
                    type="date"
                    value={searchCheckIn}
                    onChange={(e) => setSearchCheckIn(e.target.value)}
                    className="w-full bg-earth-dark border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-[11px] rounded-xl pl-9 pr-2 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">{t.bookingWidget.checkOut}</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="search-check-out"
                    type="date"
                    value={searchCheckOut}
                    onChange={(e) => setSearchCheckOut(e.target.value)}
                    className="w-full bg-earth-dark border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-[11px] rounded-xl pl-9 pr-2 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">{t.bookingWidget.guests}</label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="search-guests"
                    type="number"
                    min="1"
                    max="10"
                    value={searchGuests}
                    onChange={(e) => setSearchGuests(parseInt(e.target.value) || 1)}
                    className="w-full bg-earth-dark border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-[11px] rounded-xl pl-9 pr-2 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 col-span-2 md:col-span-1">
                <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">{t.bookingWidget.roomType}</label>
                <div className="relative">
                  <Home className="w-3.5 h-3.5 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="search-room-type"
                    value={searchRoomType}
                    onChange={(e) => setSearchRoomType(e.target.value)}
                    className="w-full bg-earth-dark border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-[11px] rounded-xl pl-9 pr-3 py-2.5 outline-none appearance-none cursor-pointer"
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.id} className="bg-earth-dark">{r.name[lang]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                id="search-availability-submit"
                onClick={() => triggerBooking(searchRoomType)}
                className="col-span-2 md:col-span-1 bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-heritage-gold/10 flex items-center justify-center"
              >
                {t.bookingWidget.searchBtn}
              </button>

            </div>
          </motion.div>
        </div>

      </section>

      {/* SECTION: FEATURED DESTINATIONS */}
      <section id="destinations-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">EXPLORE THE KINGDOM</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.destinations}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{t.titles.destinationsSub}</p>
        </div>

        {/* Destination Cards Slider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-earth-clay/60 border border-heritage-gold/10 hover:border-heritage-gold/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src={dest.image}
                    alt={dest.name[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-earth-dark/90 border border-heritage-gold/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-heritage-gold text-heritage-gold" />
                    <span className="text-xs font-mono text-heritage-gold font-bold">{dest.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-gold">{dest.region[lang]}</span>
                    <h3 className="text-xl font-serif text-earth-sand font-bold mt-1 group-hover:text-heritage-gold transition-colors">{dest.name[lang]}</h3>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {dest.description[lang]}
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-500 block font-mono">AVG EXPEDITION</span>
                  <span className="text-xs font-mono text-heritage-gold font-semibold">{formatPrice(dest.priceUsd)}</span>
                </div>
                <button
                  id={`btn-view-dest-${dest.id}`}
                  onClick={() => triggerBooking(undefined, dest.id === 'lalibela' ? 'historical-north' : undefined)}
                  className="bg-heritage-gold/10 hover:bg-heritage-gold text-heritage-gold hover:text-earth-dark border border-heritage-gold/30 hover:border-heritage-gold font-sans text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: LUXURY ROOMS & SUITES */}
      <section id="rooms-section" className="py-20 bg-earth-clay/40 border-y border-heritage-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">FIVE-STAR HABESHA HERITAGE</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.rooms}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{t.titles.roomsSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {rooms.map((room) => {
              const isSaved = wishlist.includes(room.id);
              return (
                <div
                  key={room.id}
                  className="bg-earth-dark border border-heritage-gold/10 hover:border-heritage-gold/25 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-xl relative"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-gold bg-earth-dark/90 border border-heritage-gold/30 px-3 py-1 rounded-full">
                      {room.sizeSqM} m² / {Math.round(room.sizeSqM * 10.76)} ft²
                    </span>
                  </div>

                  {/* Wishlist toggle absolute button */}
                  <button
                    id={`wishlist-${room.id}`}
                    onClick={() => toggleWishlist(room.id)}
                    className="absolute top-4 right-4 z-10 bg-earth-dark/90 hover:bg-earth-clay text-heritage-gold hover:text-heritage-gold-light border border-heritage-gold/30 p-2.5 rounded-full shadow-lg transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-heritage-gold text-heritage-gold' : 'text-heritage-gold'}`} />
                  </button>

                  <div>
                    <div className="w-full aspect-[16/10] overflow-hidden relative">
                      <img
                        src={room.image}
                        alt={room.name[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-gold">{room.type}</span>
                        <h3 className="text-xl font-serif text-earth-sand font-bold mt-1 group-hover:text-heritage-gold transition-colors">{room.name[lang]}</h3>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {room.description[lang]}
                      </p>

                      {/* Amenities checklist */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-heritage-gold block">Premium Privileges</span>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-300">
                          {room.amenities.map((am, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-heritage-gold shrink-0" />
                              <span className="truncate">{am[lang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/5 flex items-center justify-between bg-earth-clay/35">
                    <div>
                      <span className="text-[9px] text-gray-500 block font-mono">NIGHTLY RATE</span>
                      <span className="text-lg font-mono text-heritage-gold font-bold">
                        {formatPrice(room.priceUsd)} <span className="text-[10px] text-gray-400 font-sans">/ night</span>
                      </span>
                    </div>
                    <button
                      id={`btn-book-room-${room.id}`}
                      onClick={() => triggerBooking(room.id)}
                      className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-heritage-gold/5 cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: ETHIOPIAN CULTURAL EXPERIENCES */}
      <section id="culture-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">CULTURAL CONCIERGE RITUALS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.culture}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{t.titles.cultureSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-earth-clay border border-heritage-gold/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 bg-heritage-gold/15 border border-heritage-gold/40 rounded-xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-heritage-gold" />
            </div>
            <h3 className="text-lg font-serif font-bold text-earth-sand">Buna Ceremony</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Experience the ancient, traditional coffee ritual in our lounge with fresh-cut grass spread, clay Jebena brewers, and frankincense smoke.
            </p>
          </div>

          <div className="bg-earth-clay border border-heritage-gold/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 bg-heritage-green/15 border border-heritage-green/40 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-heritage-gold" />
            </div>
            <h3 className="text-lg font-serif font-bold text-earth-sand">Azmari Music Shows</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Immerse yourself in nightly acoustic performances featuring local single-stringed Masinqo players chanting bespoke poetry.
            </p>
          </div>

          <div className="bg-earth-clay border border-heritage-gold/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 bg-heritage-red/15 border border-heritage-red/40 rounded-xl flex items-center justify-center">
              <Utensils className="w-6 h-6 text-heritage-gold" />
            </div>
            <h3 className="text-lg font-serif font-bold text-earth-sand">Gursha Banquets</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Indulge in communal feasts of spicy Berbere-infused doro wat and soft Injera hand-fed as a classic gesture of friendship.
            </p>
          </div>

          <div className="bg-earth-clay border border-heritage-gold/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 bg-heritage-gold/15 border border-heritage-gold/40 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-heritage-gold" />
            </div>
            <h3 className="text-lg font-serif font-bold text-earth-sand">Handmade Art Gallery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Browse exquisite, organic cotton Habesha drapes and spiritual clay icons crafted by regional Lalibela stonemasons.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: DYNAMIC INTERACTIVE MAP & HIGHLIGHTS */}
      <section className="py-20 bg-earth-dark px-6 md:px-12 max-w-7xl mx-auto space-y-12 border-t border-heritage-gold/15">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">INTERACTIVE HERITAGE MAP</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.highlights}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{t.titles.highlightsSub}</p>
        </div>

        {/* The SVG interactive map component */}
        <InteractiveMap
          destinations={destinations}
          activeLang={lang}
          activeCurrency={currency}
          onExplore={(id) => triggerBooking(undefined, id === 'lalibela' ? 'historical-north' : undefined)}
        />
      </section>

      {/* SECTION: INTERACTIVE CHIPS WIZARD TRAVEL PLANNER */}
      <section className="py-20 bg-earth-clay/30 border-y border-heritage-gold/10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">CUSTOM BLUEPRINT PLANNER</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">Interactive Travel Planner</h2>
            <p className="text-sm text-gray-400 leading-relaxed">Select your personal holiday vibe and duration to draft a custom luxury itinerary layout instantly.</p>
          </div>

          <TravelPlanner
            activeLang={lang}
            onBookPackage={(id) => triggerBooking(undefined, id)}
          />

        </div>
      </section>

      {/* SECTION: GASTRONOMY (FOOD SECTION) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">ORGANIC HIGHLAND FINE DINING</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.food}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{t.titles.foodSub}</p>
        </div>

        <FoodSection
          foodItems={foodItems}
          activeLang={lang}
          activeCurrency={currency}
        />
      </section>

      {/* SECTION: EXCLUSIVE TOUR PACKAGES */}
      <section id="packages-section" className="py-20 bg-earth-clay/40 border-y border-heritage-gold/10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">VIP CURATED EXPERIENCES</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.packages}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{t.titles.packagesSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-earth-dark border border-heritage-gold/10 hover:border-heritage-gold/25 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="w-full aspect-[16/10] overflow-hidden relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-heritage-green text-heritage-gold border border-heritage-gold/30 px-3 py-1 rounded-full text-xs font-mono font-bold">
                      {pkg.duration[lang]}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-serif text-earth-sand font-bold group-hover:text-heritage-gold transition-colors">
                      {pkg.name[lang]}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {pkg.description[lang]}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-heritage-gold block">Package Inclusions</span>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {pkg.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-heritage-gold shrink-0" />
                            <span className="truncate">{h[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 flex items-center justify-between bg-earth-clay/35">
                  <div>
                    <span className="text-[9px] text-gray-500 block font-mono">PREMIUM RATE</span>
                    <span className="text-lg font-mono text-heritage-gold font-bold">
                      {formatPrice(pkg.priceUsd)} <span className="text-[10px] text-gray-400 font-sans">/ guest</span>
                    </span>
                  </div>
                  <button
                    id={`btn-book-pkg-${pkg.id}`}
                    onClick={() => triggerBooking(undefined, pkg.id)}
                    className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer animate-pulse-slow"
                  >
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: TESTIMONIALS */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">GUEST RECOMMENDATIONS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.testimonials}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{t.titles.testimonialsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="glass-panel-dark border border-heritage-gold/15 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-heritage-gold text-heritage-gold" />
                  ))}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{test.story[lang]}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-heritage-gold/20"
                />
                <div>
                  <h4 className="text-xs font-serif font-bold text-earth-sand">{test.name}</h4>
                  <span className="text-[10px] font-mono text-heritage-gold flex items-center gap-1">
                    <span>{test.flag}</span>
                    <span>{test.country}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: LUXURY MASONRY GALLERY */}
      <section id="gallery-section" className="py-20 bg-earth-clay/30 border-y border-heritage-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-heritage-gold">VISUAL COGNITIVE EXPLORATION</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-sand">{t.titles.gallery}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{t.titles.gallerySub}</p>
          </div>

          {/* Masonry image layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((g, idx) => (
              <div
                key={idx}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-heritage-gold/10 shadow-lg"
              >
                <img
                  src={g.url}
                  alt={g.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-gold">{g.category}</span>
                    <h4 className="text-sm font-serif font-bold text-earth-sand">{g.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-earth-dark pt-16 pb-8 border-t border-heritage-gold/20 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-heritage-gold" />
              <span className="font-serif font-bold text-sm text-earth-sand uppercase">LALIBELA HERITAGE</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Celebrating centuries of traditional Ethiopian architecture and world-class warm hospitalities. Part of the 'Land of Origins' prestigious portfolio.
            </p>
            <div className="space-y-1 text-[11px] font-mono text-heritage-gold">
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +251 11 555 4321</p>
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> concierge@lalibelaheritage.com</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-earth-sand text-xs">Featured Destinations</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#destinations-section" className="hover:text-heritage-gold">Lalibela Rock Churches</a></li>
              <li><a href="#destinations-section" className="hover:text-heritage-gold">Simien Mountains Crest</a></li>
              <li><a href="#destinations-section" className="hover:text-heritage-gold">Fasil Castle in Gondar</a></li>
              <li><a href="#destinations-section" className="hover:text-heritage-gold">Danakil Depression dallol</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-earth-sand text-xs">Help & Assistance</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => triggerBooking()} className="hover:text-heritage-gold text-left">Real-Time Booking Widget</button></li>
              <li><a href="#travel-planner-section" className="hover:text-heritage-gold">Itinerary Customizer</a></li>
              <li><button onClick={() => { const el = document.getElementById('ai-concierge-launcher'); if (el) el.click(); }} className="hover:text-heritage-gold text-left">Contact AI Companion 'Buna'</button></li>
              <li><a href="#culinary-section" className="hover:text-heritage-gold">Restaurant Reservations</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-bold text-earth-sand text-xs">Royal Heritage Newsletter</h4>
            <p className="text-[11px] leading-relaxed">Subscribe to receive exclusive access to cultural celebrations, flight promotions, and local recipes.</p>
            <div className="flex gap-1.5">
              <input
                id="footer-newsletter-input"
                type="email"
                placeholder="vip.traveler@domain.com"
                className="bg-earth-clay border border-heritage-gold/20 rounded-lg px-3 py-2 text-[11px] outline-none text-earth-sand flex-1"
              />
              <button
                id="footer-newsletter-submit"
                onClick={() => alert("Thank you for subscribing to Lalibela Heritage.")}
                className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold px-3 py-2 rounded-lg cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono">
          <p>© 2026 Lalibela Heritage Collection & Resorts. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-heritage-gold">Privacy Policy</a>
            <a href="#" className="hover:text-heritage-gold">Terms of Stay</a>
            <a href="#" className="hover:text-heritage-gold">Telebirr & Chapa Merchant Info</a>
          </div>
        </div>
      </footer>

      {/* Server-Side AI Travel Companion Concierge */}
      <AIAssistant activeLang={lang} />

      {/* Real-time Booking Widget Portal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        rooms={rooms}
        tours={tourPackages}
        initialRoomId={preSelectedRoom}
        initialTourId={preSelectedTour}
        activeLang={lang}
        activeCurrency={currency}
        onBookingSuccess={(ref) => {
          setBookingsCount(prev => prev + 1);
        }}
      />

    </div>
  );
}
