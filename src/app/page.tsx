"use client";
import React, { useEffect, useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FrameScroller from "@/components/FrameScroller";
import MenuGallery from "@/components/MenuGallery";
import ReviewsSection from "@/components/ReviewsSection";
import DeconstructedPlate from "@/components/DeconstructedPlate";
import HeritageSection from "@/components/HeritageSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

export default function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );
    }

    if (pRef.current) {
      gsap.fromTo(pRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <SmoothScroll>
      <main className="w-full bg-transparent min-h-screen overflow-hidden">
        {/* Nav */}
        <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference">
          <div className="font-serif text-2xl md:text-3xl tracking-[0.3em] font-light text-white">RAJ THAL</div>
          <div className="font-sans text-[10px] tracking-[0.5em] font-light text-[#E5C07B] uppercase hidden md:block">Surat, Gujarat — The Art of the Plate</div>
          <div className="font-sans text-[10px] tracking-[0.3em] font-light text-white uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer">Menu</div>
        </nav>
        
        {/* Story Section 1: Hero Video/Canvas */}
        <section id="hero-scroll">
          <FrameScroller />
        </section>

        {/* Story Section 2: Heritage Narrative */}
        <HeritageSection />

        {/* Story Section 3: Text interlude */}
        <section className="w-full min-h-[60vh] flex items-center justify-center bg-transparent text-center px-4 z-10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E5C07B]/10 via-black/95 to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto z-10 py-32">
            <div className="overflow-hidden pb-4">
              <h2 ref={textRef} className="text-4xl md:text-7xl font-serif mb-8 leading-tight bg-gradient-to-b from-[#FFF3D8] to-[#D4AF37] bg-clip-text text-transparent transform translate-y-full opacity-0">
                A Symphony of <span className="italic">Thirteen</span> Spices.
              </h2>
            </div>
            <p ref={pRef} className="font-sans font-light text-gray-400 leading-[2.2] text-lg md:text-2xl tracking-wide max-w-2xl mx-auto opacity-0 transform translate-y-8">
              At Raj Thal, we don't just serve food; we compose experiences. Each element of our Thali is a note in a larger culinary masterpiece, curated for the modern connoisseur.
            </p>
          </div>
        </section>

        {/* Story Section 4: Curated Menu Gallery */}
        <MenuGallery />
        
        {/* Story Section 5: Interactive WebGL */}
        <section id="interactive-plate">
          <DeconstructedPlate />
        </section>

        {/* Story Section 6: Customer Reviews */}
        <ReviewsSection />

        {/* Story Section 7: Reservation */}
        <ReservationSection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}

