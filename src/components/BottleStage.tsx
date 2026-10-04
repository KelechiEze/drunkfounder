import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../types';
import { FloatingElement } from './FloatingElement';
import { RotateCw } from 'lucide-react';

interface BottleStageProps {
  currentSlide: SlideData;
  slideIndex: number;
  direction: number;
  triggerSpinCount: number;
  onBottleClick: () => void;
  soundEnabled: boolean;
}

export const BottleStage: React.FC<BottleStageProps> = ({
  currentSlide,
  triggerSpinCount,
  onBottleClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Group floating elements into back and front layers
  const backElements = currentSlide.floatingElements.filter((el) => el.layer === 'back');
  const frontElements = currentSlide.floatingElements.filter((el) => el.layer === 'front');

  const handleBottleClick = () => {
    setClickCount((prev) => prev + 1);
    onBottleClick();
  };

  return (
    <div className="relative w-full max-w-[420px] md:max-w-[460px] lg:max-w-[500px] h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px] mx-auto flex items-center justify-center select-none perspective-1000">
      {/* Ambient Radial Glow behind the bottle */}
      <div
        className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full blur-3xl opacity-35 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentSlide.textColColor} 0%, transparent 70%)`,
        }}
      />

      {/* Layer 1: Back floating elements (Behind the bottle) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatePresence mode="popLayout">
          {backElements.map((el) => (
            <FloatingElement key={el.id} element={el} slideKey={currentSlide.id} />
          ))}
        </AnimatePresence>
      </div>

      {/* Layer 2: Main Bottle Stage with 360-Degree Forward Rotation in Place (Y-Axis Turntable Spin) */}
      <div
        className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
        onClick={handleBottleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`Interactive 360° forward spinning bottle: ${currentSlide.title}. Click to rotate in position.`}
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSlide.id}-${triggerSpinCount}-${clickCount}`}
            // Upright 360-Degree Forward Rotation in Position (Rotates around vertical Y-axis, staying vertically upright)
            initial={{
              rotateY: 0,
              scale: 0.95,
              opacity: 0.85,
            }}
            animate={{
              rotateY: 360,
              scale: 1,
              opacity: 1,
            }}
            exit={{
              rotateY: 360,
              scale: 0.95,
              opacity: 0,
              transition: { duration: 0.35, ease: 'easeIn' },
            }}
            transition={{
              rotateY: {
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1], // Smooth organic deceleration
              },
              scale: {
                duration: 0.6,
                ease: 'easeOut',
              },
              opacity: {
                duration: 0.4,
              },
            }}
            style={{
              transformOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
            className="relative flex items-center justify-center"
          >
            {/* The High-Resolution Bottle Asset */}
            <motion.div
              animate={{
                y: isHovered ? -8 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              className="relative"
            >
              <img
                src={currentSlide.bottleImage}
                alt={currentSlide.bottleAlt}
                className="max-h-[300px] sm:max-h-[390px] md:max-h-[460px] lg:max-h-[520px] w-auto object-contain filter-drop-shadow-ambient select-none pointer-events-auto transition-filter duration-300"
                draggable={false}
              />

              {/* Cylindrical 3D Specular Light Gleam that sweeps across the bottle as it rotates forward */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '180%', opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 1.15,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-overlay"
              />
            </motion.div>

            {/* Realistic Contact Shadow on floor below the bottle */}
            <motion.div
              animate={{
                scale: isHovered ? 0.9 : 1,
                opacity: isHovered ? 0.35 : 0.5,
              }}
              className="absolute -bottom-3 sm:-bottom-4 w-[65%] h-5 bg-black/45 rounded-full blur-md -z-10 pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Interactive "Click bottle to rotate 360°" Indicator on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-8 pointer-events-none px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-semibold text-white/95 flex items-center gap-1.5 shadow-lg border border-white/20 whitespace-nowrap"
        >
          <RotateCw className="w-3 h-3 animate-spin text-white" />
          <span>Click bottle to spin forward 360°</span>
        </motion.div>
      </div>

      {/* Layer 3: Front floating elements (Hovering in front of the bottle in diagonal form) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <AnimatePresence mode="popLayout">
          {frontElements.map((el) => (
            <FloatingElement key={el.id} element={el} slideKey={currentSlide.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
