"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;

export default function FrameScroller() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !containerRef.current) return;

    // Load images
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    let lastFrame = -1;
    const render = (renderIndex: number) => {
      if (renderIndex === lastFrame) return;
      lastFrame = renderIndex;
      
      const img = images[renderIndex];
      if (img && img.complete) {
        // Simple letterbox/cover drawing to maintain aspect
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let x = 0;
        let y = 0;

        if (imgRatio > canvasRatio) {
          // Image is wider
          drawWidth = canvas.height * imgRatio;
          x = (canvas.width - drawWidth) / 2;
        } else {
          // Image is taller
          drawHeight = canvas.width / imgRatio;
          y = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.5; // Moody noir vibe, dim the image
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Filename format: ezgif-frame-001.jpg
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Resize setup
          const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(0);
          };
          window.addEventListener("resize", resize);
          resize();
        }
      };
      images.push(img);
    }

    const state = { frame: 0 };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000", // Scrolling length
      scrub: 0.5,
      pin: true,
      animation: gsap.to(state, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => render(state.frame),
      }),
    });

    // Make sure we unmount properly
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] bg-black">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-accent tracking-widest drop-shadow-lg">
            The Art of the Plate
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-2xl font-sans text-gray-300 font-light tracking-wide">
            A Symphony of Surat by Hotel Raj Thal
          </p>
        </div>
      </div>
    </div>
  );
}
