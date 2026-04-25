"use client";

import React from "react";
import { MapPin, Phone, Clock, Camera, Share2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-12 px-6 md:px-12 lg:px-24 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="font-serif text-3xl text-white tracking-[0.3em] mb-8">RAJ THAL</h2>
          <p className="font-sans text-gray-400 font-light leading-relaxed text-sm mb-8">
            A sanctuary of taste where Gujarati heritage meets modern culinary art. Every dish is a chapter of our story.
          </p>
          <div className="flex gap-6">
            <Camera size={20} className="text-gray-500 hover:text-[#E5C07B] transition-colors cursor-pointer" />
            <Share2 size={20} className="text-gray-500 hover:text-[#E5C07B] transition-colors cursor-pointer" />
            <Globe size={20} className="text-gray-500 hover:text-[#E5C07B] transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white tracking-[0.3em] text-xs font-semibold mb-8 uppercase">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-sans tracking-wide">
            <li className="hover:text-[#E5C07B] transition-colors cursor-pointer">The Story</li>
            <li className="hover:text-[#E5C07B] transition-colors cursor-pointer">Menu Gallery</li>
            <li className="hover:text-[#E5C07B] transition-colors cursor-pointer">Reservations</li>
            <li className="hover:text-[#E5C07B] transition-colors cursor-pointer">Private Dining</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white tracking-[0.3em] text-xs font-semibold mb-8 uppercase">Contact</h4>
          <div className="space-y-6">
            <div className="flex items-start gap-4 text-gray-400 hover:text-[#E5C07B] transition-colors cursor-pointer group text-sm leading-relaxed font-sans">
              <MapPin size={18} className="mt-1 shrink-0 text-[#E5C07B]" />
              <p>Opp. C.B. Patel Health Club, VIP Road, Vesu, Surat, Gujarat 395007</p>
            </div>
            <div className="flex items-center gap-4 text-gray-400 hover:text-[#E5C07B] transition-colors cursor-pointer text-sm font-sans">
              <Phone size={18} className="text-[#E5C07B]" />
              <p>+91 261 123 4567</p>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-white tracking-[0.3em] text-xs font-semibold mb-8 uppercase">Hours</h4>
          <div className="flex items-start gap-4 text-gray-400 text-sm leading-relaxed font-sans">
            <Clock size={18} className="mt-1 text-[#E5C07B]" />
            <div>
              <p className="mb-2">Lunch: 11:00 AM - 3:30 PM</p>
              <p>Dinner: 7:00 PM - 11:30 PM</p>
              <p className="text-[#E5C07B] mt-4 text-xs tracking-widest">Open Every Day</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between items-center gap-8 text-[10px] font-sans tracking-[0.3em] text-gray-500 uppercase">
        <p>&copy; {new Date().getFullYear()} HOTEL RAJ THAL. CRAFTED FOR EXCELLENCE.</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-[#E5C07B] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#E5C07B] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

