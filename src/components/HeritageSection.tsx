"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeritageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current && imageRef.current) {
      gsap.fromTo(textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-24 gap-12 overflow-hidden">
      <div ref={textRef} className="w-full md:w-1/2 z-10">
        <h4 className="text-[#E5C07B] font-sans tracking-[0.4em] uppercase text-xs mb-6">Our Legacy</h4>
        <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 leading-tight">
          A Tradition Carved in <span className="italic text-[#E5C07B]">Flavor.</span>
        </h2>
        <div className="space-y-6 text-gray-400 font-sans font-light leading-relaxed text-lg max-w-xl">
          <p>
            For generations, the kitchens of Hotel Raj Thal have been a sanctuary for the authentic tastes of Surat. Our story begins with a simple promise: to honor the geometry of the traditional Thali while embracing the soul of modern hospitality.
          </p>
          <p>
            Every spice is hand-selected, every recipe is a whispered secret from the past, and every plate is a canvas where heritage meets innovation.
          </p>
        </div>
      </div>
      
      <div ref={imageRef} className="w-full md:w-1/2 relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/heritage.png" 
          alt="Raj Thal Heritage" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-8 z-20">
          <p className="text-[#E5C07B] font-serif text-2xl">Since 1982</p>
          <p className="text-white/50 text-xs tracking-widest uppercase">The Original Taste of Surat</p>
        </div>
      </div>
    </section>
  );
}
