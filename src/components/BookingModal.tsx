import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Home, Compass, CreditCard, Ticket, CheckCircle, Smartphone, Award, Shield, ChevronRight } from 'lucide-react';
import { Room, TourPackage, Language, Currency } from '../types';
import { currencySymbols, conversionRates } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  tours: TourPackage[];
  initialRoomId?: string;
  initialTourId?: string;
  activeLang: Language;
  activeCurrency: Currency;
  onBookingSuccess: (bookingRef: string) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  rooms,
  tours,
  initialRoomId,
  initialTourId,
  activeLang,
  activeCurrency,
  onBookingSuccess
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState(initialRoomId || rooms[0]?.id || '');
  const [tourId, setTourId] = useState(initialTourId || '');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal percentage, e.g. 0.15
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'chapa' | 'stripe'>('telebirr');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Loading & Reference states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Reset values when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setRoomId(initialRoomId || rooms[0]?.id || '');
      setTourId(initialTourId || '');
      setCheckIn(new Date().toISOString().split('T')[0]);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 3);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
      setGuests(1);
      setPromoCode('');
      setAppliedDiscount(0);
      setPromoError('');
      setPromoSuccess('');
      setPhoneNumber('');
    }
  }, [isOpen, initialRoomId, initialTourId]);

  if (!isOpen) return null;

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  // Find Room & Tour rates
  const selectedRoom = rooms.find(r => r.id === roomId);
  const selectedTour = tours.find(t => t.id === tourId);

  const roomRate = selectedRoom ? selectedRoom.priceUsd : 0;
  const tourRate = selectedTour ? selectedTour.priceUsd : 0;

  const roomSubtotal = roomRate * nights;
  const tourSubtotal = tourRate * guests;
  const totalUsd = roomSubtotal + tourSubtotal;
  
  const discountAmountUsd = totalUsd * appliedDiscount;
  const finalUsd = totalUsd - discountAmountUsd;

  // Currency Convert helper
  const formatPrice = (usd: number) => {
    const converted = usd * conversionRates[activeCurrency];
    return `${currencySymbols[activeCurrency]}${Math.round(converted).toLocaleString()}`;
  };

  // Validate Promo Code
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'WELCOME') {
      setAppliedDiscount(0.15);
      setPromoSuccess('Promo WELCOME applied! (15% Exclusive Discount)');
    } else if (code === 'HABESHA') {
      setAppliedDiscount(0.10);
      setPromoSuccess('Promo HABESHA applied! (10% Heritage Discount)');
    } else if (code === '') {
      setPromoError('Please enter a promo code');
    } else {
      setPromoError('Invalid promo code');
      setAppliedDiscount(0);
    }
  };

  // Submit Booking
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      const details = {
        roomId,
        roomName: selectedRoom?.name?.en,
        tourId,
        tourName: selectedTour?.name?.en || 'None',
        checkIn,
        checkOut,
        nights,
        guests,
        totalUsd: finalUsd,
        currency: activeCurrency,
        convertedTotal: finalUsd * conversionRates[activeCurrency],
        paymentMethod
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookingType: tourId ? 'Hotel & Tour Combo' : 'Hotel Stay',
          details
        })
      });

      const data = await response.json();
      setBookingRef(data.id);
      setStep(3);
      onBookingSuccess(data.id);
    } catch (error) {
      console.error("Booking Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-[680px] bg-earth-dark border border-heritage-gold/25 rounded-3xl overflow-hidden shadow-2xl relative z-10"
      >
        {/* Close Button */}
        <button
          id="close-booking-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-earth-sand transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-earth-clay border-b border-heritage-gold/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 habesha-pattern pointer-events-none" />
          <h3 className="text-xl font-serif text-earth-sand font-bold flex items-center gap-2">
            <Award className="w-5 h-5 text-heritage-gold" />
            Lalibela Heritage Collection Booking
          </h3>
          <p className="text-xs text-heritage-gold font-mono uppercase tracking-widest mt-1">
            Step {step} of 3: {step === 1 ? 'Trip Details' : step === 2 ? 'Payment Method' : 'Confirmation'}
          </p>
        </div>

        {/* Step 1: Booking Details Form */}
        {step === 1 && (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Room selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">1. Choose Accommodations</label>
                <div className="relative">
                  <Home className="w-4 h-4 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="select-room"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full bg-earth-clay border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-sm rounded-xl pl-10 pr-4 py-3 outline-none appearance-none"
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.id} className="bg-earth-dark text-earth-sand">
                        {r.name[activeLang]} ({formatPrice(r.priceUsd)}/nt)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tour package selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">2. Select Private Tour (Optional)</label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="select-tour"
                    value={tourId}
                    onChange={(e) => setTourId(e.target.value)}
                    className="w-full bg-earth-clay border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-sm rounded-xl pl-10 pr-4 py-3 outline-none appearance-none"
                  >
                    <option value="" className="bg-earth-dark text-earth-sand">None - Accommodation Only</option>
                    {tours.map(t => (
                      <option key={t.id} value={t.id} className="bg-earth-dark text-earth-sand">
                        {t.name[activeLang]} ({formatPrice(t.priceUsd)}/guest)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Check-In</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-check-in"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-earth-clay border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-xs rounded-xl pl-10 pr-3 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Check-Out</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-check-out"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-earth-clay border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-xs rounded-xl pl-10 pr-3 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Guests</label>
                <div className="relative">
                  <Users className="w-4 h-4 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-guests"
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="w-full bg-earth-clay border border-heritage-gold/20 focus:border-heritage-gold text-earth-sand text-sm rounded-xl pl-10 pr-3 py-2.5 outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Promo Code Apply */}
            <div className="p-4 bg-earth-clay/50 border border-heritage-gold/10 rounded-2xl">
              <label className="text-xs font-mono text-heritage-gold uppercase tracking-wider mb-2 block">Heritage Loyalty Promotion</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-4 h-4 text-heritage-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-promo"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code (e.g., WELCOME)"
                    className="w-full bg-earth-dark border border-heritage-gold/15 focus:border-heritage-gold text-earth-sand text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none uppercase"
                  />
                </div>
                <button
                  id="apply-promo-btn"
                  onClick={handleApplyPromo}
                  className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-medium text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-red-500 mt-2 font-mono">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-green-500 mt-2 font-mono">{promoSuccess}</p>}
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Tip: Use code <span className="text-heritage-gold font-bold">WELCOME</span> (15% off) or <span className="text-heritage-gold font-bold">HABESHA</span> (10% off).</p>
            </div>

            {/* Real-time Invoice Summary */}
            <div className="bg-earth-dark border border-heritage-gold/20 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-heritage-gold pb-2 border-b border-heritage-gold/10">Invoice Summary</h4>
              
              <div className="flex justify-between text-xs text-gray-300">
                <span>{selectedRoom?.name?.[activeLang]} ({nights} nights)</span>
                <span className="font-mono">{formatPrice(roomSubtotal)}</span>
              </div>

              {selectedTour && (
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{selectedTour?.name?.[activeLang]} ({guests} guests)</span>
                  <span className="font-mono">{formatPrice(tourSubtotal)}</span>
                </div>
              )}

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-xs text-green-500">
                  <span>Discount Applied ({(appliedDiscount * 100).toFixed(0)}%)</span>
                  <span className="font-mono">-{formatPrice(discountAmountUsd)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-earth-sand font-bold border-t border-heritage-gold/10 pt-3">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-heritage-gold" /> Total Price
                </span>
                <span className="font-mono text-heritage-gold text-lg">{formatPrice(finalUsd)}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-2">
              <button
                id="cancel-booking"
                onClick={onClose}
                className="text-gray-400 hover:text-earth-sand text-sm font-sans transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="next-step-booking"
                onClick={() => setStep(2)}
                className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-semibold text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-heritage-gold/10"
              >
                Proceed to Payment
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Gateways */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">Choose Local or Global Gateway</label>
              
              <div className="grid grid-cols-3 gap-3">
                
                {/* Telebirr */}
                <button
                  id="pay-telebirr"
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                    paymentMethod === 'telebirr'
                      ? 'border-heritage-gold bg-heritage-gold/5 text-heritage-gold shadow-md'
                      : 'border-white/10 bg-earth-clay/30 hover:bg-earth-clay/50 text-gray-400 hover:text-earth-sand'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-blue-400 shrink-0" />
                  <span className="text-xs font-serif font-bold">Telebirr</span>
                  <span className="text-[8px] font-mono tracking-wide uppercase opacity-70">Ethio Telecom</span>
                </button>

                {/* Chapa */}
                <button
                  id="pay-chapa"
                  onClick={() => setPaymentMethod('chapa')}
                  className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                    paymentMethod === 'chapa'
                      ? 'border-heritage-gold bg-heritage-gold/5 text-heritage-gold shadow-md'
                      : 'border-white/10 bg-earth-clay/30 hover:bg-earth-clay/50 text-gray-400 hover:text-earth-sand'
                  }`}
                >
                  <Award className="w-6 h-6 text-green-400 shrink-0" />
                  <span className="text-xs font-serif font-bold">Chapa</span>
                  <span className="text-[8px] font-mono tracking-wide uppercase opacity-70">Local Bank Gateway</span>
                </button>

                {/* Stripe */}
                <button
                  id="pay-stripe"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                    paymentMethod === 'stripe'
                      ? 'border-heritage-gold bg-heritage-gold/5 text-heritage-gold shadow-md'
                      : 'border-white/10 bg-earth-clay/30 hover:bg-earth-clay/50 text-gray-400 hover:text-earth-sand'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-amber-500 shrink-0" />
                  <span className="text-xs font-serif font-bold">Stripe / Card</span>
                  <span className="text-[8px] font-mono tracking-wide uppercase opacity-70">International Card</span>
                </button>

              </div>
            </div>

            {/* Telebirr Details */}
            {paymentMethod === 'telebirr' && (
              <div className="p-4 bg-blue-950/20 border border-blue-500/20 rounded-2xl space-y-4">
                <div className="flex items-start gap-4">
                  {/* Mock QR Code representation */}
                  <div className="w-24 h-24 bg-white p-2 rounded-xl border border-gray-200 shrink-0 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-100 border-2 border-dashed border-blue-600 rounded flex flex-col items-center justify-center">
                      <span className="text-[8px] font-mono text-blue-700 font-bold uppercase">TELEBIRR</span>
                      <span className="text-[10px] font-mono text-gray-600">Scan QR</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-serif font-semibold text-earth-sand">Ethio Telecom Telebirr Pay</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Enter your mobile number to trigger an authorized payment prompt on your Telebirr application, or scan the secure merchant QR code.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Telebirr Account Number</label>
                  <input
                    id="input-telebirr-phone"
                    type="tel"
                    placeholder="+251 9XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-earth-dark border border-heritage-gold/25 focus:border-heritage-gold text-earth-sand text-sm rounded-xl px-4 py-3 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Chapa Details */}
            {paymentMethod === 'chapa' && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-semibold text-earth-sand">Chapa Secure Local Payment</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Chapa supports instant checkout using Commercial Bank of Ethiopia (CBE Birr), Awash Bank, Dashen Bank, or local debit cards securely.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Bank / Wallet Type</label>
                    <select className="w-full bg-earth-dark border border-heritage-gold/25 focus:border-heritage-gold text-earth-sand text-xs rounded-xl px-4 py-3 outline-none">
                      <option className="bg-earth-dark">Commercial Bank of Ethiopia (CBE Birr)</option>
                      <option className="bg-earth-dark">Dashen Bank (Amole)</option>
                      <option className="bg-earth-dark">Awash Bank Wallet</option>
                      <option className="bg-earth-dark">Local Visa/Mastercard</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-heritage-gold uppercase tracking-wider block">Wallet Mobile No.</label>
                    <input
                      id="input-chapa-phone"
                      type="tel"
                      placeholder="+251 9XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-earth-dark border border-heritage-gold/25 focus:border-heritage-gold text-earth-sand text-xs rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Stripe Details */}
            {paymentMethod === 'stripe' && (
              <div className="p-4 bg-earth-clay/50 border border-heritage-gold/15 rounded-2xl space-y-4">
                <h4 className="text-sm font-serif font-semibold text-earth-sand">Secure Credit Card Checkout</h4>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase">Card Number</label>
                    <input
                      id="input-card-number"
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-earth-dark border border-heritage-gold/25 focus:border-heritage-gold text-earth-sand text-xs rounded-xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400">Expiry Date</label>
                      <input
                        id="input-card-expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-earth-dark border border-heritage-gold/25 focus:border-heritage-gold text-earth-sand text-xs rounded-xl px-4 py-3 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-400">Secure CVC</label>
                      <input
                        id="input-card-cvc"
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-earth-dark border border-heritage-gold/25 focus:border-heritage-gold text-earth-sand text-xs rounded-xl px-4 py-3 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price tag summary */}
            <div className="flex items-center justify-between p-4 bg-earth-clay rounded-2xl border border-heritage-gold/10">
              <div>
                <span className="text-xs text-gray-400 block font-mono">DUE NOW</span>
                <span className="text-lg font-mono text-heritage-gold font-bold">{formatPrice(finalUsd)}</span>
              </div>
              <div className="text-right text-[10px] text-gray-400 font-mono">
                <p>Transactions are processed in {activeCurrency}</p>
                <p className="text-heritage-gold">Includes premium travel insurance</p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-2">
              <button
                id="back-booking-step"
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-earth-sand text-sm font-sans transition-colors cursor-pointer"
              >
                Back to Details
              </button>
              <button
                id="confirm-booking-pay"
                disabled={isSubmitting}
                onClick={handleSubmitBooking}
                className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-heritage-gold/15"
              >
                {isSubmitting ? 'Verifying Gateway...' : 'Confirm & Guarantee Stay'}
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation Summary */}
        {step === 3 && (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-heritage-green/20 rounded-full border-2 border-heritage-gold/50 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-heritage-gold animate-bounce" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-serif font-bold text-earth-sand">Your Royal Reservation is Secured!</h4>
              <p className="text-sm text-gray-300">
                A warm welcome awaits you. Your booking receipt and travel guide has been dispatched.
              </p>
            </div>

            <div className="max-w-[420px] mx-auto bg-earth-clay border border-heritage-gold/20 rounded-2xl p-5 space-y-3.5 text-left font-mono text-xs">
              <div className="flex justify-between border-b border-heritage-gold/10 pb-2 text-heritage-gold font-bold">
                <span>RESERVATION REFERENCE:</span>
                <span>{bookingRef}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Accommodation:</span>
                <span className="text-earth-sand">{selectedRoom?.name?.[activeLang]}</span>
              </div>
              {selectedTour && (
                <div className="flex justify-between text-gray-400">
                  <span>Guided Excursion:</span>
                  <span className="text-earth-sand">{selectedTour?.name?.[activeLang]}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Itinerary Dates:</span>
                <span className="text-earth-sand">{checkIn} to {checkOut} ({nights} nights)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Party Size:</span>
                <span className="text-earth-sand">{guests} Guests</span>
              </div>
              <div className="flex justify-between border-t border-heritage-gold/10 pt-2 text-heritage-gold text-sm font-bold">
                <span>Total Settled:</span>
                <span>{formatPrice(finalUsd)} ({paymentMethod.toUpperCase()})</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 max-w-[320px] mx-auto pt-4">
              <button
                id="booking-done-btn"
                onClick={onClose}
                className="bg-heritage-gold hover:bg-heritage-gold/90 text-earth-dark font-sans font-bold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-lg"
              >
                Return to Exploration
              </button>
              <span className="text-[10px] text-gray-400 font-mono">
                Questions? Launch our AI Concierge on the bottom-right corner.
              </span>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
