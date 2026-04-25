"use client";

import React from "react";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";

export default function ReservationSection() {
  return (
    <section className="w-full py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <img src="/reservation.png" alt="Reservation Background" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h4 className="text-[#E5C07B] font-sans tracking-[0.4em] uppercase text-xs mb-6">Experience the Art</h4>
        <h2 className="text-4xl md:text-7xl font-serif text-white mb-12">Reserve Your Seat</h2>
        
        <div className="w-full max-w-4xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#E5C07B]/30 transition-all group">
              <Calendar className="text-[#E5C07B] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Select Date</p>
                <p className="text-white font-sans">May 15, 2024</p>
              </div>
            </div>
            
            <div className="flex flex-col items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#E5C07B]/30 transition-all group">
              <Clock className="text-[#E5C07B] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Select Time</p>
                <p className="text-white font-sans">08:00 PM</p>
              </div>
            </div>
            
            <div className="flex flex-col items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-[#E5C07B]/30 transition-all group">
              <Users className="text-[#E5C07B] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Guests</p>
                <p className="text-white font-sans">2 Persons</p>
              </div>
            </div>
          </div>
          
          <button className="w-full py-6 bg-[#E5C07B] text-black font-sans font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-4 group">
            Confirm Reservation <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        
        <p className="mt-12 text-gray-500 font-sans text-sm tracking-widest">
          OR CALL US DIRECTLY AT <span className="text-[#E5C07B]">+91 261 123 4567</span>
        </p>
      </div>
    </section>
  );
}
