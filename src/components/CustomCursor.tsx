"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only mount cursor logic if it's a device that supports precise hovering (not mobile)
    if (window.matchMedia("(hover: none)").matches) return;
    
    setIsVisible(true);

    // Initial position to avoid jumping from top-left
    gsap.set(cursorRef.current, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(followerRef.current, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const onMouseMove = (e: MouseEvent) => {
      // Small dot follows instantly
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Ring follows with slight elastic delay
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const attachHoverStates = () => {
      const elements = document.querySelectorAll("a, button, input, .interactive");
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    attachHoverStates();

    // Hide system cursor globally
    document.body.style.cursor = "none";
    
    // Auto-hide the cursor elements when leaving the window
    const onMouseOut = () => {
        if(cursorRef.current && followerRef.current){
            cursorRef.current.style.opacity = '0';
            followerRef.current.style.opacity = '0';
        }
    };
    const onMouseEnterWindow = () => {
        if(cursorRef.current && followerRef.current){
            cursorRef.current.style.opacity = '1';
            followerRef.current.style.opacity = '1';
        }
    };
    
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseenter", onMouseEnterWindow);


    // Mutation observer for dynamically added links/buttons
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") attachHoverStates();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      observer.disconnect();
      document.body.style.cursor = "auto"; // Restore system cursor on unmount
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#E5C07B] rounded-full mix-blend-exclusion pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-[#E5C07B]/50 rounded-full mix-blend-exclusion pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovering ? "scale-[2] bg-[#E5C07B] border-transparent" : "scale-100"
        }`}
      />
    </>
  );
}
