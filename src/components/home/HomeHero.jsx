'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

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
  const userToggledRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  // Attempt audible autoplay first; fall back to muted + unlock on first interaction if browser blocks unmuted autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unlockListener = null;

    const removeUnlock = () => {
      if (unlockListener) {
        window.removeEventListener('pointerdown', unlockListener);
        window.removeEventListener('keydown', unlockListener);
        unlockListener = null;
      }
    };

    const startPlayback = async () => {
      try {
        video.defaultMuted = false;
        video.muted = false;
        video.volume = 1;
        await video.play();
        setIsMuted(false);
      } catch {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});

        unlockListener = (e) => {
          if (e.target && e.target.closest && e.target.closest('[data-hero-mute-btn]')) {
            removeUnlock();
            return;
          }
          if (!userToggledRef.current && videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1;
            videoRef.current.play().catch(() => {});
            setIsMuted(false);
          }
          removeUnlock();
        };

        window.addEventListener('pointerdown', unlockListener, { passive: true });
        window.addEventListener('keydown', unlockListener, { passive: true });
      }
    };

    startPlayback();

    return () => removeUnlock();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    userToggledRef.current = true;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    setIsMuted(nextMuted);
  };

  // Typewriter state
  const [serviceIndex, setServiceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fullTargetText = SERVICES_LIST[serviceIndex];

  // Auto-typing animation effect
  useEffect(() => {
    let timer;
    const typingSpeed = 65;
    const deletingSpeed = 32;
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
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.01] transform-gpu"
        >
          <source 
            src="https://res.cloudinary.com/fjdmukyv/video/upload/v1794487640/1104_2.mp4" 
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

        {/* Typing Text - Slightly Larger & Readable */}
        <div className="mt-2 sm:mt-4 max-w-3xl px-2 flex items-center justify-center min-h-[28px] sm:min-h-[38px]">
          <div className="flex items-center justify-center text-center">
            <span className="text-white/95 font-medium text-sm sm:text-lg md:text-xl lg:text-2xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-manrope">
              {displayedText}
            </span>
            {/* Blinking Subtle Typing Cursor */}
            <span className="inline-block w-[2px] h-4 sm:h-5 md:h-6 bg-emerald-400 ml-1.5 animate-pulse align-middle" />
          </div>
        </div>
      </div>

      {/* Top-Right Corner Audio Mute / Unmute Button Only (No Other Controls) */}
      <button
        type="button"
        data-hero-mute-btn="true"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-10 h-10 rounded-full bg-black/55 hover:bg-[#216B35] text-white backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg transition-all cursor-pointer"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>
    </section>
  );
}
