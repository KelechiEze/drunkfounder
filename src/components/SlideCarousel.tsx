import React from 'react';
import { motion } from 'motion/react';
import { SlideData, CartItem } from '../types';
import { BottleStage } from './BottleStage';
import { RightAccordion } from './RightAccordion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface SlideCarouselProps {
  slides: SlideData[];
  currentIndex: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  triggerSpinCount: number;
  onTriggerSpin: () => void;
  onAddToCart: (item: CartItem) => void;
  soundEnabled: boolean;
  autoPlayProgress?: number;
}

export const SlideCarousel: React.FC<SlideCarouselProps> = ({
  slides,
  currentIndex,
  direction,
  onPrev,
  onNext,
  onSelectSlide,
  triggerSpinCount,
  onTriggerSpin,
  onAddToCart,
  soundEnabled,
  autoPlayProgress = 0,
}) => {
  const currentSlide = slides[currentIndex];
  const nextIndex = (currentIndex + 1) % slides.length;
  const nextSlide = slides[nextIndex];

  return (
    <div className="relative w-full overflow-hidden">
      {/* FULL WIDTH HERO SECTION - Spans 100% screen width from edge to edge */}
      <div className="relative w-full flex">
        {/* Main Active Hero Slide spanning 100% full width */}
        <motion.div
          key={`hero-slide-${currentSlide.id}`}
          initial={{
            opacity: 0.9,
            x: direction > 0 ? 60 : -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0.9,
            x: direction > 0 ? -60 : 60,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex-1 min-h-[560px] sm:min-h-[620px] md:min-h-[660px] lg:min-h-[700px] flex flex-col justify-between overflow-hidden transition-colors duration-700"
          style={{
            backgroundColor: currentSlide.bgColor,
          }}
        >
          {/* Subtle lighting gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${currentSlide.bgGradient} opacity-90 pointer-events-none`}
          />

          {/* Micro texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Auto-play progress bar indicator at the very top of the hero */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-black/10 z-30 overflow-hidden">
            <div
              className="h-full bg-white/70 transition-all duration-100 ease-linear"
              style={{ width: `${autoPlayProgress}%` }}
            />
          </div>

          {/* MAIN HERO CONTENT - Centered content container within full-width background */}
          <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-10 md:px-14 lg:px-16 pt-4 sm:pt-6 pb-10 gap-8 md:gap-4">
            {/* LEFT COLUMN: Number & Description (Lg: 4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center text-white order-2 lg:order-1 pt-2 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4 max-w-sm"
              >
                {/* Big outlined number matching the video */}
                <div className="flex items-center gap-2">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white/95">
                    {currentSlide.number}
                  </span>
                  <span className="h-[2px] w-12 bg-white/40 rounded-full" />
                </div>

                {/* Subtitle / Description text exactly matching the video copy */}
                <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/95 tracking-wide">
                  {currentSlide.description}
                </p>

                {/* Secondary detail & badge */}
                <div className="pt-2 flex flex-col gap-1 text-xs text-white/75">
                  <div className="flex items-center gap-1.5 font-medium text-white/95">
                    <Sparkles className="w-3.5 h-3.5 text-white/80" />
                    <span>{currentSlide.badge}</span>
                  </div>
                  <p className="line-clamp-2 text-white/65 leading-normal">
                    {currentSlide.subDescription}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CENTER COLUMN: Giant Background Typography & Spinning Bottle Stage (Lg: 4 cols) */}
            <div className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2 my-2 lg:my-0">
              {/* Giant Background Word (e.g. "RENEW", "REVIVE", "REFUEL") */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                aria-hidden="true"
              >
                <div className="w-full flex items-center justify-between px-0 sm:px-2">
                  {/* Left part of word */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9, x: -30 }}
                    animate={{ opacity: 0.95, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[170px] leading-none tracking-tight uppercase"
                    style={{
                      color: currentSlide.textColColor,
                      textShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    }}
                  >
                    {currentSlide.titleLeft}
                  </motion.span>

                  {/* Right part of word */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9, x: 30 }}
                    animate={{ opacity: 0.95, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[170px] leading-none tracking-tight uppercase"
                    style={{
                      color: currentSlide.textColColor,
                      textShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    }}
                  >
                    {currentSlide.titleRight}
                  </motion.span>
                </div>
              </div>

              {/* The Spinning Bottle & Floating Fruit / Chocolate Elements Stage */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <BottleStage
                  currentSlide={currentSlide}
                  slideIndex={currentIndex}
                  direction={direction}
                  triggerSpinCount={triggerSpinCount}
                  onBottleClick={onTriggerSpin}
                  soundEnabled={soundEnabled}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Accordion (How to consume, Benefits, Buying options) (Lg: 4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end order-3">
              <RightAccordion currentSlide={currentSlide} onAddToCart={onAddToCart} />
            </div>
          </div>

          {/* Carousel Navigation Arrows & Slide Indicators */}
          <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-6 flex items-center justify-between">
            {/* Slide Index Pills */}
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => onSelectSlide(idx)}
                  className={`group relative h-9 px-3.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : 'bg-white/15 hover:bg-white/25 text-white/80 font-medium'
                  }`}
                  aria-label={`Slide ${s.number}: ${s.title}`}
                >
                  <span className="text-xs">{s.number}</span>
                  <span className="text-xs uppercase tracking-wider hidden sm:inline">
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <button
                onClick={onNext}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 active:scale-90 text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-md cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* SIDE PEEK: Visible slice of the next slide on the right, exactly matching the video */}
        <div
          onClick={onNext}
          title={`Click to view ${nextSlide.number} ${nextSlide.title}`}
          className="hidden xl:flex w-14 lg:w-16 shrink-0 relative flex-col items-center justify-center cursor-pointer transition-opacity hover:opacity-90 border-l border-black/10 overflow-hidden"
          style={{
            backgroundColor: nextSlide.bgColor,
          }}
        >
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
          <div className="-rotate-90 whitespace-nowrap text-white font-display text-sm font-extrabold tracking-widest flex items-center gap-2 select-none uppercase">
            <span>{nextSlide.number}</span>
            <span>{nextSlide.title}</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
};
