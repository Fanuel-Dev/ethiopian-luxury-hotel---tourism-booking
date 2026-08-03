export type Language = 'en' | 'am' | 'fr' | 'ar';
export type Currency = 'USD' | 'ETB' | 'EUR';

export interface TranslationDict {
  heroTitle: string;
  heroSubtitle: string;
  bookYourStay: string;
  exploreEthiopia: string;
  watchExperience: string;
  bookingWidget: {
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
    tourPackage: string;
    searchBtn: string;
  };
  nav: {
    home: string;
    hotels: string;
    resorts: string;
    tours: string;
    culture: string;
    destinations: string;
    experiences: string;
    gallery: string;
    contact: string;
    login: string;
    register: string;
  };
  titles: {
    destinations: string;
    destinationsSub: string;
    rooms: string;
    roomsSub: string;
    culture: string;
    cultureSub: string;
    highlights: string;
    highlightsSub: string;
    food: string;
    foodSub: string;
    testimonials: string;
    testimonialsSub: string;
    gallery: string;
    gallerySub: string;
    packages: string;
    packagesSub: string;
    assistant: string;
    assistantSub: string;
  };
}

export interface Destination {
  id: string;
  name: { [key in Language]: string };
  region: { [key in Language]: string };
  rating: number;
  description: { [key in Language]: string };
  priceUsd: number;
  image: string;
  highlights: { [key in Language]: string }[];
  coordinates: { x: number; y: number }; // SVG map percent coordinates (0-100)
}

export interface Room {
  id: string;
  name: { [key in Language]: string };
  type: string;
  description: { [key in Language]: string };
  sizeSqM: number;
  priceUsd: number;
  image: string;
  amenities: { [key in Language]: string }[];
}

export interface TourPackage {
  id: string;
  name: { [key in Language]: string };
  duration: { [key in Language]: string };
  description: { [key in Language]: string };
  priceUsd: number;
  highlights: { [key in Language]: string }[];
  image: string;
}

export interface FoodItem {
  id: string;
  name: { [key in Language]: string };
  type: 'dish' | 'drink' | 'ceremony';
  description: { [key in Language]: string };
  priceUsd: number;
  image: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  story: { [key in Language]: string };
  avatar: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
