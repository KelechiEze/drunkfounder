import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData, CartItem } from '../types';
import { Plus, Check, ArrowRight, Sparkles } from 'lucide-react';

interface BottomSectionProps {
  currentSlide: SlideData;
  onAddToCart: (item: CartItem) => void;
  onSelectSlide: (index: number) => void;
}

export const BottomSection: React.FC<BottomSectionProps> = ({
  currentSlide,
  onAddToCart,
  onSelectSlide,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null);
  const [addedBundleSuccess, setAddedBundleSuccess] = useState(false);

  const bottom = currentSlide.bottomSection;
  const bundle = bottom.bundle;

  const handleAddBundle = () => {
    if (!bottom.bundle) return;
    const bundleItem: CartItem = {
      id: 'daily-cleanse-trio-bundle',
      slideId: 'bundle',
      name: bottom.bundle.name,
      volume: '3 x 330ml Complete Cleanse',
      price: bottom.bundle.price,
      quantity: 1,
      image: '/assets/bottle-3.png',
    };
    onAddToCart(bundleItem);
    setAddedBundleSuccess(true);
    setTimeout(() => setAddedBundleSuccess(false), 2600);
  };

  return (
    <div className="relative w-full z-30">
      {/* Torn / Ripped Paper Top Edge Effect */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          className="w-full h-5 sm:h-7 md:h-9 text-white fill-current block"
        >
          {/* Natural organic ragged torn deckle edge path */}
          <path d="M0,28 Q25,8 60,20 T130,12 T210,24 T290,9 T380,22 T460,7 T550,25 T630,10 T720,26 T800,12 T890,24 T970,8 T1050,22 T1140,11 L1200,20 L1200,32 L0,32 Z" />
        </svg>
      </div>

      {/* Main Bottom Card Content */}
      <div className="w-full bg-white text-neutral-900 px-6 sm:px-10 md:px-14 lg:px-16 pt-3 pb-8 md:pb-10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Section Headline */}
          <div className="shrink-0">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
              {bottom.title}
            </h3>
            {bottom.subtitle && (
              <p className="text-xs sm:text-sm text-neutral-700 mt-0.5 max-w-sm">
                {bottom.subtitle}
              </p>
            )}
          </div>

          {/* Dynamic Content: Bundle or Ingredients */}
          <AnimatePresence mode="wait">
            {bottom.type === 'bundle' && bottom.bundle ? (
              /* Case 1: Slide 01 - Our Daily Bundles */
              <motion.div
                key={`bottom-bundle-${currentSlide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col sm:flex-row items-center justify-end gap-6 sm:gap-10 w-full"
              >
                {/* 3 Bottles Linked with '+' Signs as shown in the video */}
                <div className="flex items-center gap-3 sm:gap-5 py-1">
                  {bottom.bundle.items.map((item, idx) => (
                    <React.Fragment key={item.name}>
                      <div
                        onClick={() => onSelectSlide(idx)}
                        className="flex flex-col items-center group cursor-pointer transition-transform hover:-translate-y-1"
                        title={`Click to view ${item.name}`}
                      >
                        <div className="relative w-12 h-16 sm:w-16 sm:h-22 md:w-20 md:h-26 flex items-center justify-center">
                          <img
                            src={item.bottleImg}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                            draggable={false}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-800 tracking-wide mt-1">
                          {item.name}
                        </span>
                      </div>

                      {/* Plus divider between bottles */}
                      {bundle && idx < bundle.items.length - 1 && (
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 font-bold text-xs select-none">
                          <Plus className="w-3.5 h-3.5 text-neutral-600 stroke-[2.5]" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Bundle Price & Add to Cart Button */}
                <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-neutral-200 pt-3 sm:pt-0 sm:pl-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl font-black text-neutral-900">
                        ${bottom.bundle.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-neutral-600 line-through">
                        ${bottom.bundle.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {bottom.bundle.discountText}
                    </span>
                  </div>

                  <button
                    onClick={handleAddBundle}
                    className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {addedBundleSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <span>Add Bundle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Case 2: Slide 02 & 03 - Our Ingredients Are */
              <motion.div
                key={`bottom-ingredients-${currentSlide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-wrap sm:flex-nowrap items-center justify-end gap-4 sm:gap-8 w-full"
              >
                {bottom.ingredients?.map((ing, idx) => {
                  const isExpanded = selectedIngredient === idx;
                  return (
                    <div
                      key={ing.name}
                      onClick={() => setSelectedIngredient(isExpanded ? null : idx)}
                      className="relative flex items-center gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group"
                    >
                      {/* Ingredient Visual Thumbnail */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-neutral-100/70 p-1 flex items-center justify-center overflow-hidden shrink-0 border border-neutral-200/60 shadow-inner">
                        <img
                          src={ing.image}
                          alt={ing.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-black">
                          {ing.name}
                        </span>
                        <span className="text-[11px] text-neutral-600">
                          {ing.subtitle}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {ing.badge}
                        </span>
                      </div>

                      {/* Tooltip on Click / Hover */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -6 }}
                            className="absolute -top-24 left-0 right-0 sm:left-auto sm:right-0 sm:w-64 p-3 rounded-xl bg-neutral-900 text-white text-xs shadow-xl z-50 pointer-events-auto border border-white/10"
                          >
                            <p className="font-bold text-white mb-1">{ing.name}</p>
                            <p className="text-neutral-300 leading-snug">{ing.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
