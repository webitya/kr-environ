'use client';

import { useState, useEffect, useRef } from 'react';

const SERVICES_LIST = [
  "Bird Diverters",
  "Forest Clearances",
  "Environmental Clearances",
  "Wildlife Clearances",
  "CGWA NOC",
  "Wildlife Management",
  "Socio-Economic Surveys",
  "Drone & DGPS Surveys",
  "Environmental Lab Testing",
  "Compensatory Afforestation",
  "Tree Transplantation",
  "Statutory Compliance",
  "Solar Power Solutions",
  "Rainwater Harvesting",
  "Quality Analysis",
  "Remote Sensing & GIS",
  "Ecological Modelling",
  "Biodiversity Assessment",
  "PTCC Clearances",
  "Chain-Linked Fencing"
];

export default function HomeHero() {
  const videoRef = useRef(null);

  // Guarantee immediate fast playback on mount across all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  // Typewriter state
  const [serviceIndex, setServiceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fullTargetText = SERVICES_LIST[serviceIndex];

  // Auto-typing animation effect
  useEffect(() => {
    let timer;
    const typingSpeed = 35;
    const deletingSpeed = 18;
    const holdDuration = 2000;

    if (!isDeleting) {
      if (displayedText.length < fullTargetText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullTargetText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, holdDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullTargetText.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setServiceIndex((prev) => (prev + 1) % SERVICES_LIST.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, fullTargetText]);

  return (
    <section 
      className="relative w-full aspect-[16/9] min-h-[220px] max-h-[100dvh] md:aspect-auto md:h-[88vh] lg:h-[92vh] flex items-center justify-center overflow-hidden bg-[#0a1a11]"
      aria-label="KR Environ Solutions Hero Section"
    >
      {/* =========================================================================
          1. FULL-WIDTH BACKGROUND VIDEO (AUTOMATIC AUTOPLAY & LOOP, 16:9 RATIO ON MOBILE)
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none bg-[#0a1a11]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.01] transform-gpu"
        >
          <source 
            src="https://res.cloudinary.com/fjdmukyv/video/upload/v1793910406/1104_1.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>

      {/* =========================================================================
          2. LIGHT BLACK OVERLAY (CLEAN, NO FOGGY BOTTOM DISSOLVE)
          ========================================================================= */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35 pointer-events-none z-10" />

      {/* =========================================================================
          3. BRAND NAME + SMALL TYPING TEXT (RESPONSIVE TYPOGRAPHY ON MOBILE)
          ========================================================================= */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Brand Name */}
        <h1 
          style={{ color: '#FFFFFF' }}
          className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold !text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] select-none font-manrope"
        >
          KR Environ Solutions
        </h1>

        {/* Small Typing Text - No Numbers, No Bold */}
        <div className="mt-1.5 sm:mt-3.5 max-w-2xl px-2 flex items-center justify-center min-h-[22px] sm:min-h-[30px]">
          <div className="flex items-center justify-center text-center">
            <span className="text-white/95 font-normal text-xs sm:text-base md:text-lg tracking-wider drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] font-manrope">
              {displayedText}
            </span>
            {/* Blinking Subtle Typing Cursor */}
            <span className="inline-block w-[1.5px] sm:w-[2px] h-3 sm:h-4.5 bg-emerald-400 ml-1 animate-pulse align-middle" />
          </div>
        </div>
      </div>
    </section>
  );
}
