import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData, CartItem } from '../types';
import { Plus, Check, ShoppingCart, Sparkles } from 'lucide-react';

interface RightAccordionProps {
  currentSlide: SlideData;
  onAddToCart: (item: CartItem) => void;
  onSelectOption?: (optionId: string) => void;
}

export const RightAccordion: React.FC<RightAccordionProps> = ({
  currentSlide,
  onAddToCart,
}) => {
  // Keep track of which accordion section is expanded
  const [openSection, setOpenSection] = useState<'consume' | 'benefits' | 'buying' | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('single');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const toggleSection = (section: 'consume' | 'benefits' | 'buying') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const currentOptions = currentSlide.accordion.buying.options;
  const activeOption = currentOptions.find((o) => o.id === selectedOptionId) || currentOptions[0];

  const handleAddOptionToCart = (option: typeof currentOptions[0]) => {
    const cartItem: CartItem = {
      id: `${currentSlide.id}-${option.id}`,
      slideId: currentSlide.id,
      name: `${currentSlide.title} ${option.name}`,
      volume: option.volume,
      price: option.price,
      quantity: 1,
      image: currentSlide.bottleImage,
    };
    onAddToCart(cartItem);
    setAddedNotice(`Added ${option.name} to cart!`);
    setTimeout(() => setAddedNotice(null), 2400);
  };

  return (
    <div className="w-full max-w-[380px] lg:max-w-[420px] text-white">
      {/* 1. How to consume */}
      <div className="border-t border-white/35 py-3 sm:py-3.5">
        <button
          onClick={() => toggleSection('consume')}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
          aria-expanded={openSection === 'consume'}
        >
          <span className="text-sm md:text-base font-semibold tracking-wide text-white group-hover:text-white/90 transition-colors">
            {currentSlide.accordion.consume.title}
          </span>
          <span className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
            <Plus
              className={`w-4 h-4 text-white stroke-[2.2] transition-transform duration-300 ${
                openSection === 'consume' ? 'rotate-45 text-white/90' : 'group-hover:scale-110'
              }`}
            />
          </span>
        </button>

        <AnimatePresence>
          {openSection === 'consume' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-2 text-xs md:text-sm text-white/90 space-y-2.5 font-normal leading-relaxed">
                <p className="font-semibold text-white/95 text-xs tracking-wide uppercase">
                  {currentSlide.accordion.consume.headline}
                </p>
                <p className="text-white/85">{currentSlide.accordion.consume.body}</p>
                <ul className="space-y-1.5 pt-1">
                  {currentSlide.accordion.consume.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/80 text-xs">
                      <span className="text-white font-bold">·</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Benefits */}
      <div className="border-t border-white/35 py-3 sm:py-3.5">
        <button
          onClick={() => toggleSection('benefits')}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
          aria-expanded={openSection === 'benefits'}
        >
          <span className="text-sm md:text-base font-semibold tracking-wide text-white group-hover:text-white/90 transition-colors">
            {currentSlide.accordion.benefits.title}
          </span>
          <span className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
            <Plus
              className={`w-4 h-4 text-white stroke-[2.2] transition-transform duration-300 ${
                openSection === 'benefits' ? 'rotate-45 text-white/90' : 'group-hover:scale-110'
              }`}
            />
          </span>
        </button>

        <AnimatePresence>
          {openSection === 'benefits' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-2 text-xs md:text-sm text-white/90 space-y-2.5 font-normal leading-relaxed">
                <p className="font-semibold text-white/95 text-xs tracking-wide uppercase">
                  {currentSlide.accordion.benefits.headline}
                </p>
                <p className="text-white/85">{currentSlide.accordion.benefits.body}</p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {currentSlide.accordion.benefits.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-black/15 backdrop-blur-sm border border-white/10 text-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Buying options */}
      <div className="border-t border-b border-white/35 py-3 sm:py-3.5">
        <button
          onClick={() => toggleSection('buying')}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
          aria-expanded={openSection === 'buying'}
        >
          <span className="text-sm md:text-base font-semibold tracking-wide text-white group-hover:text-white/90 transition-colors">
            {currentSlide.accordion.buying.title}
          </span>
          <span className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
            <Plus
              className={`w-4 h-4 text-white stroke-[2.2] transition-transform duration-300 ${
                openSection === 'buying' ? 'rotate-45 text-white/90' : 'group-hover:scale-110'
              }`}
            />
          </span>
        </button>

        <AnimatePresence>
          {openSection === 'buying' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-2 text-xs md:text-sm text-white/90 space-y-3 font-normal">
                <p className="text-xs text-white/80">Select packaging configuration for fresh cold-chain delivery:</p>

                {/* Option selector cards */}
                <div className="space-y-2">
                  {currentOptions.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white/20 border-white shadow-sm'
                            : 'bg-black/15 border-white/15 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-xs md:text-sm">{opt.name}</span>
                            <span className="text-[11px] text-white/70">({opt.volume})</span>
                            {opt.popular && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white text-black uppercase tracking-wider">
                                Popular
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-white/75 mt-0.5">{opt.description}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">${opt.price.toFixed(2)}</div>
                          {opt.originalPrice && (
                            <div className="text-[10px] text-white/60 line-through">
                              ${opt.originalPrice.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Direct Action Button */}
                <div className="pt-1">
                  <button
                    onClick={() => handleAddOptionToCart(activeOption)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add {activeOption.name} · ${activeOption.price.toFixed(2)}</span>
                  </button>
                  {addedNotice && (
                    <p className="text-center text-xs font-semibold text-white mt-1.5 flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{addedNotice}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
