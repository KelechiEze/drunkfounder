import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Plus, Search, Heart, ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';

interface ProductShowcaseCarouselProps {
  onAddToCart: (item: CartItem) => void;
}

interface SpiritSmallCard {
  id: string;
  title: string;
  category: string;
  price: number;
  bgGradient: string;
  image: string;
}

const FEATURED_SPIRITS = [
  {
    id: 'spirit-bourbon',
    name: 'Reserve Bourbon',
    subtitle: 'Single barrel aged 12 years in charred oak',
    price: 94,
    sizes: ['375ml', '700ml', '750ml', '1.5L'],
    cardColor: '#5c62ec',
    cardGradient: 'from-[#676df5] to-[#4e54e4]',
    image: '/assets/spirits/bourbon_cutout.png',
    tasting: 'Toasted vanilla, amber honey & roasted pecan',
  },
  {
    id: 'spirit-mezcal',
    name: 'Artisanal Mezcal',
    subtitle: 'Wild Espadín roasted in underground volcanic pits',
    price: 88,
    sizes: ['375ml', '700ml', '750ml', '1.5L'],
    cardColor: '#b8735b',
    cardGradient: 'from-[#c27c64] to-[#a86149]',
    image: '/assets/spirits/mezcal_cutout.png',
    tasting: 'Smoky cedarwood, sweet roasted agave & pink peppercorn',
  },
  {
    id: 'spirit-gin',
    name: 'Botanical Cobalt Gin',
    subtitle: 'Copper pot vapour-infused with 14 wild botanicals',
    price: 76,
    sizes: ['375ml', '700ml', '750ml', '1.5L'],
    cardColor: '#2b8a74',
    cardGradient: 'from-[#329e85] to-[#206f5c]',
    image: '/assets/bottle-2.png',
    tasting: 'Arctic juniper, alpine pine needles & fresh Meyer lemon',
  },
];

const SMALL_SPIRIT_CARDS: SpiritSmallCard[] = [
  {
    id: 'card-cognac',
    title: 'Vintage XO Cognac',
    category: 'Grande Champagne',
    price: 110,
    bgGradient: 'bg-[#ffccd8]',
    image: '/assets/bottle-3.png',
  },
  {
    id: 'card-bourbon',
    title: 'Small Batch Bourbon',
    category: 'Kentucky Straight',
    price: 84,
    bgGradient: 'bg-[#fca34d]',
    image: '/assets/spirits/bourbon_cutout.png',
  },
  {
    id: 'card-mezcal',
    title: 'Smoked Wild Mezcal',
    category: 'Oaxaca Ancestral',
    price: 92,
    bgGradient: 'bg-[#f87171]',
    image: '/assets/spirits/mezcal_cutout.png',
  },
  {
    id: 'card-botanical',
    title: 'Reserve Gin Vapour',
    category: 'Alpine Botanical',
    price: 68,
    bgGradient: 'bg-[#a78bfa]',
    image: '/assets/bottle-1.png',
  },
];

export const ProductShowcaseCarousel: React.FC<ProductShowcaseCarouselProps> = ({
  onAddToCart,
}) => {
  const [activeNav, setActiveNav] = useState('Products');
  const [activeBottomFilter, setActiveBottomFilter] = useState('New arrivals');
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('750ml');
  const [spinAngle, setSpinAngle] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [addedCardId, setAddedCardId] = useState<string | null>(null);

  const featured = FEATURED_SPIRITS[featuredIdx];

  const handleTriggerSpin = () => {
    setSpinAngle((prev) => prev + 360);
  };

  const handleNext = () => {
    setFeaturedIdx((prev) => (prev + 1) % FEATURED_SPIRITS.length);
    setCarouselOffset((prev) => (prev + 1) % SMALL_SPIRIT_CARDS.length);
    handleTriggerSpin();
  };

  const handlePrev = () => {
    setFeaturedIdx((prev) => (prev - 1 + FEATURED_SPIRITS.length) % FEATURED_SPIRITS.length);
    setCarouselOffset((prev) => (prev - 1 + SMALL_SPIRIT_CARDS.length) % SMALL_SPIRIT_CARDS.length);
    handleTriggerSpin();
  };

  const handleAddFeatured = () => {
    onAddToCart({
      id: `${featured.id}-${selectedSize}`,
      slideId: featured.id,
      name: `${featured.name} (${selectedSize})`,
      volume: `${selectedSize} Single Bottle`,
      price: featured.price,
      quantity: 1,
      image: featured.image,
    });
    setAddedCardId(featured.id);
    setTimeout(() => setAddedCardId(null), 1800);
  };

  const handleAddSmallCard = (card: SpiritSmallCard) => {
    onAddToCart({
      id: `card-${card.id}`,
      slideId: card.id,
      name: card.title,
      volume: '750ml Reserve Spirit',
      price: card.price,
      quantity: 1,
      image: card.image,
    });
    setAddedCardId(card.id);
    setTimeout(() => setAddedCardId(null), 1800);
  };

  const toggleWishlist = () => {
    setIsWishlistActive((prev) => !prev);
    setWishlistCount((prev) => (isWishlistActive ? prev - 1 : prev + 1));
  };

  // Reorder small cards based on carousel offset
  const visibleCards = [
    SMALL_SPIRIT_CARDS[carouselOffset % SMALL_SPIRIT_CARDS.length],
    SMALL_SPIRIT_CARDS[(carouselOffset + 1) % SMALL_SPIRIT_CARDS.length],
    SMALL_SPIRIT_CARDS[(carouselOffset + 2) % SMALL_SPIRIT_CARDS.length],
  ];

  return (
    <section className="relative w-full bg-[#f8f9fc] text-neutral-900 py-16 sm:py-20 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Sub-Navigation Bar matching Screenshot 1 exactly */}
        <div className="flex items-center justify-between pb-10 sm:pb-12 border-b border-neutral-200/70">
          {/* Left Brand Badge */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#5b61f8] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              SP.
            </div>
            <span className="font-bold text-sm text-neutral-800 tracking-tight hidden sm:inline">
              Products
            </span>
          </div>

          {/* Center Tabs with active indicator line */}
          <nav className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-neutral-500">
            {['Products', 'Category', 'Customize', 'Collection'].map((tab) => {
              const isActive = activeNav === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveNav(tab)}
                  className={`relative py-1 cursor-pointer transition-colors ${
                    isActive ? 'text-neutral-900 font-bold' : 'hover:text-neutral-900'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeSubNavTab"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[2.5px] bg-[#5b61f8] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Icon Controls + Dot Matrix Grid Accent */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              aria-label="Search spirits"
              className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={toggleWishlist}
              aria-label="Wishlist"
              className="relative w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlistActive ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#5b61f8] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            </button>

            {/* 3x3 Dot Matrix Accent */}
            <div className="hidden sm:grid grid-cols-3 gap-1 pl-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-neutral-300" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area: Left Big Featured Card + Right Squircle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10 sm:pt-12 items-center">
          {/* LEFT: Featured Card matching Screenshot 1 with 360° Bottle */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-[32px] p-7 sm:p-9 text-white overflow-visible shadow-2xl transition-all duration-500 min-h-[480px] flex flex-col justify-between"
              style={{ backgroundColor: featured.cardColor }}
            >
              {/* Dot matrix pattern on the right inside featured card */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 grid grid-cols-4 gap-1.5 opacity-25 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                ))}
              </div>

              {/* 360° Circular Badge Button on Left Edge */}
              <button
                onClick={handleTriggerSpin}
                title="Click to spin bottle 360°"
                className="absolute -left-4 top-[28%] z-30 w-11 h-11 rounded-full bg-white text-neutral-800 shadow-xl border border-neutral-100 flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              >
                <RotateCw className="w-3.5 h-3.5 text-neutral-700 animate-spin-slow" />
                <span className="text-[9px] font-black tracking-tight leading-none mt-0.5">360°</span>
              </button>

              {/* Top Row: Price in Big Bold Text */}
              <div className="flex justify-end items-start relative z-10">
                <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                  ${featured.price}
                </span>
              </div>

              {/* Center Floating Liquor Bottle with 360° Forward Rotation and Specular Gleam */}
              <div
                className="relative py-2 flex items-center justify-center min-h-[220px] sm:min-h-[250px] cursor-pointer group"
                onClick={handleTriggerSpin}
                style={{ perspective: 1000 }}
              >
                {/* Floating Citrus / Amber Ice Accent Particle */}
                <motion.div
                  animate={{
                    y: [-6, 6, -6],
                    rotate: [-8, 8, -8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.2,
                    ease: 'easeInOut',
                  }}
                  className="absolute right-4 top-2 z-20 pointer-events-none w-14 h-14"
                >
                  <img
                    src="/assets/cutouts/orange_slice.png"
                    alt="Orange zest botanical"
                    className="w-full h-full object-contain filter-drop-shadow-soft"
                  />
                </motion.div>

                {/* 360° Forward Spinning Liquor Bottle in Position */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${featured.id}-${spinAngle}`}
                    initial={{ rotateY: 0, scale: 0.95 }}
                    animate={{ rotateY: 360, scale: 1 }}
                    transition={{
                      rotateY: { duration: 1.1, ease: [0.25, 1, 0.5, 1] },
                      scale: { duration: 0.4 },
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-300"
                  >
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="max-h-[230px] sm:max-h-[265px] w-auto object-contain filter-drop-shadow-ambient select-none group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Specular Light Gleam */}
                    <motion.div
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: '180%', opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.1, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none rounded-2xl mix-blend-overlay"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ground bottle shadow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-black/30 rounded-full blur-md -z-10 pointer-events-none" />
              </div>

              {/* Card Bottom Content: Title, Subtitle, Size Pills, Plus Button */}
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight">
                    {featured.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 font-medium mt-0.5">
                    {featured.subtitle}
                  </p>
                </div>

                {/* Size Pill Selector: 375ml, 700ml, 750ml, 1.5L */}
                <div className="flex items-center gap-2 pt-1">
                  {featured.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'px-3 py-1 bg-white/35 backdrop-blur-md text-white rounded-full border border-white/50 shadow-xs'
                            : 'text-white/70 hover:text-white px-2 py-1'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Row: Tasting Notes + Big Rounded Plus Button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="max-w-[70%]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">
                      Tasting Profile
                    </span>
                    <p className="text-xs text-white/90 truncate">{featured.tasting}</p>
                  </div>

                  {/* Big Rounded Plus Button in Bottom-Right Corner */}
                  <button
                    onClick={handleAddFeatured}
                    className="w-14 h-14 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 transition-all text-white flex items-center justify-center cursor-pointer shadow-lg border border-white/25"
                    aria-label="Add to cart"
                  >
                    {addedCardId === featured.id ? (
                      <Check className="w-6 h-6 stroke-[3] text-emerald-300" />
                    ) : (
                      <Plus className="w-7 h-7 stroke-[2.5]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 3 Squircle Cards Carousel with Animated Liquor Bottles */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {visibleCards.map((card) => {
                const isAdded = addedCardId === card.id;
                return (
                  <div key={card.id} className="flex flex-col group">
                    {/* Squircle Card Container with Hover Float Animation */}
                    <div
                      className={`relative rounded-[32px] p-6 h-[230px] sm:h-[250px] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl ${card.bgGradient} overflow-hidden`}
                    >
                      {/* Ambient background soft light circle */}
                      <div className="absolute inset-0 bg-white/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Small White Plus Button in Top-Left Corner */}
                      <button
                        onClick={() => handleAddSmallCard(card)}
                        title="Add spirit to cart"
                        className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white text-neutral-800 shadow-md flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all cursor-pointer z-20 active:scale-90"
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.4]" />
                        )}
                      </button>

                      {/* Centered Floating Liquor Bottle with Hover Tilt and Levitation */}
                      <motion.div
                        whileHover={{ y: -8, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="relative z-10 flex items-center justify-center h-full w-full -rotate-6 group-hover:rotate-0 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleAddSmallCard(card)}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="max-h-[160px] sm:max-h-[180px] w-auto object-contain filter-drop-shadow-soft select-none"
                        />
                      </motion.div>

                      {/* Bottle Floor Shadow */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-2.5 bg-black/25 rounded-full blur-sm -z-0 pointer-events-none group-hover:w-20 group-hover:opacity-60 transition-all duration-300" />
                    </div>

                    {/* Below Card Info: Title, Price, View Details Link */}
                    <div className="pt-4 px-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {card.category}
                        </span>
                        <div className="font-display text-base sm:text-lg font-black text-neutral-950">
                          ${card.price}
                        </div>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate">
                        {card.title}
                      </h4>
                      <button
                        onClick={() => handleAddSmallCard(card)}
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-semibold transition-colors cursor-pointer pt-0.5"
                      >
                        <span>View reserve details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar matching Screenshot 1 */}
        <div className="flex items-center justify-between pt-12 sm:pt-14 border-t border-neutral-200/70 mt-12 sm:mt-14">
          {/* Left Filter Tabs: New arrivals (active), Popular, Recommend */}
          <div className="flex items-center gap-6 sm:gap-8 text-xs font-semibold text-neutral-500">
            {['New arrivals', 'Popular', 'Recommend'].map((filter) => {
              const isActive = activeBottomFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveBottomFilter(filter)}
                  className={`relative py-1 cursor-pointer transition-colors ${
                    isActive ? 'text-neutral-900 font-bold' : 'hover:text-neutral-800'
                  }`}
                >
                  <span>{filter}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-3 h-[2px] bg-[#5b61f8] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Navigation Controls: Pill Button with Back and Next */}
          <div className="flex items-center rounded-xl bg-neutral-200/80 p-1 shadow-2xs">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg text-xs font-bold bg-[#858cf8] text-white shadow-xs hover:bg-[#7279f7] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
