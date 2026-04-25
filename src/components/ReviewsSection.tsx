"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Star } from "lucide-react";

const reviews = [
  { text: "A transcendent experience. The Maharaja Thali redefines fine dining in Surat.", author: "Vogue India" },
  { text: "Impeccable service, dramatic lighting, and deeply authentic flavors.", author: "A. Sharma" },
  { text: "Every bite feels like a meticulously crafted work of art.", author: "Culinary Digest" },
  { text: "The definitive destination for premium traditional cuisine.", author: "R. Desai" },
];

export default function ReviewsSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Simple infinite marquee
    const marqueeContent = marqueeRef.current.firstElementChild as HTMLElement;
    if (marqueeContent) {
      gsap.to(marqueeContent, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });
    }
  }, []);

  return (
    <section className="py-32 bg-transparent overflow-hidden relative z-20 border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E5C07B]/10 via-transparent to-transparent pointer-events-none opacity-50" />
      
      <div className="text-center mb-24 px-4 relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6 uppercase opacity-90">Praises & Echoes</h2>
        <div className="flex justify-center gap-2">
          {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-[#E5C07B] fill-[#E5C07B]" />)}
        </div>
      </div>

      <div ref={marqueeRef} className="flex whitespace-nowrap overflow-hidden py-4">
        <div className="flex gap-8 md:gap-16 px-4 md:px-8 items-center">
          {/* Double map for seamless loop */}
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div key={i} className="inline-block w-[320px] md:w-[500px] shrink-0 whitespace-normal text-center">
              <p className="font-serif text-xl md:text-3xl text-gray-300 leading-[1.6] italic mb-8">"{review.text}"</p>
              <div className="w-12 h-[1px] bg-[#E5C07B]/40 mx-auto mb-4"></div>
              <span className="font-sans text-xs md:text-sm tracking-[0.3em] font-semibold text-[#E5C07B] uppercase">{review.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
