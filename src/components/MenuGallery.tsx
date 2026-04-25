"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

const menuItems = [
  {
    name: "Maharaja Thali",
    desc: "A sprawling canvas of 14 distinct flavors, showcasing the absolute pinnacle of Gujarati heritage.",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=3131&auto=format&fit=crop"
  },
  {
    name: "Smoked Dal Dalhousie",
    desc: "Slow-cooked over charcoal for 24 hours, infused with pure ghee and mountain spices.",
    price: "₹320",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=3270&auto=format&fit=crop"
  },
  {
    name: "Saffron Paneer Tikka",
    desc: "Cottage cheese steeped in a saffron-cashew emulsion, charred perfectly in the tandoor.",
    price: "₹450",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=3171&auto=format&fit=crop"
  },
  {
    name: "Rose Petal Kheer",
    desc: "A chilled, velvety dessert laced with aromatic rose water and crushed pistachios.",
    price: "₹280",
    image: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=3270&auto=format&fit=crop"
  }
];

export default function MenuGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (cardsRef.current.length === 0) return;
    
    gsap.fromTo(cardsRef.current, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 lg:px-24 bg-transparent relative z-20 border-t border-[#E5C07B]/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E5C07B]/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[#E5C07B]/20 pb-8">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl text-white tracking-wide mb-6 opacity-90">Curated Signatures</h2>
            <p className="font-sans text-[#E5C07B] tracking-[0.3em] uppercase text-xs font-semibold">Elevated Culinary Art</p>
          </div>
          <button className="hidden md:flex items-center gap-4 text-xs font-sans tracking-[0.2em] text-[#E5C07B] hover:text-white transition-colors mt-6 md:mt-0 group uppercase border border-[#E5C07B]/30 px-6 py-3 rounded-full hover:bg-[#E5C07B]/10">
            VIEW FULL MENU <MoveRight size={16} className="transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group flex flex-col md:flex-row gap-6 hover:-translate-y-2 transition-transform duration-500 ease-out cursor-default bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 hover:border-[#E5C07B]/30 hover:shadow-[0_10px_40px_rgba(229,192,123,0.05)]"
            >
              <div className="w-full md:w-1/3 aspect-square overflow-hidden rounded-xl relative shrink-0">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <div className="flex justify-between items-start mb-4 border-b border-dashed border-white/10 pb-4 group-hover:border-[#E5C07B]/30 transition-colors">
                  <h3 className="font-serif text-2xl md:text-3xl text-gray-200 group-hover:text-[#E5C07B] transition-colors leading-tight pr-4">{item.name}</h3>
                  <span className="font-sans text-sm tracking-[0.1em] text-[#E5C07B] bg-[#E5C07B]/10 px-3 py-1 rounded-full">{item.price}</span>
                </div>
                <p className="font-sans text-gray-400 font-light leading-[1.8] text-sm max-w-md">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center md:hidden">
           <button className="flex items-center gap-4 text-sm font-sans tracking-widest text-[#D4AF37] pb-1 border-b border-[#D4AF37]">
            VIEW FULL MENU <MoveRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
