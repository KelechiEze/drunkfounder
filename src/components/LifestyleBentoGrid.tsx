import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, ArrowRight, Sparkles, Award } from 'lucide-react';

interface BentoArticle {
  id: string;
  category: string;
  title: string;
  priceTag: string;
  readTime: string;
  image: string;
  bgColor: string;
  textColor: string;
  buttonBg: string;
  spiritNotes: string;
  abv: string;
  content: string;
}

const ARTICLES: Record<string, BentoArticle> = {
  cocktail: {
    id: 'cocktail',
    category: 'MIXOLOGY',
    title: 'The Hand-Carved Ice & Bourbon Old Fashioned',
    priceTag: 'Read for $0.99',
    readTime: '4 min read',
    image: '/assets/spirits/bento_cocktail_pour.jpg',
    bgColor: 'from-[#80aba2] via-[#a3c7c0] to-[#cfe2de]',
    textColor: 'text-white',
    buttonBg: 'bg-white text-neutral-900 hover:bg-neutral-100',
    spiritNotes: 'Charred oak vanillin, expressed Valencia orange oils, and Angostura aromatics.',
    abv: '45.2% ABV · Single Cask',
    content:
      'The timeless Old Fashioned elevated: how directional ice crystallization prevents unwanted melt dilution, preserving the complex ester bouquet of 12-year Kentucky straight bourbon from the first sip to the last drop.',
  },
  cognac: {
    id: 'cognac',
    category: 'COGNAC CELLAR',
    title: 'The Century Reserve XO Decanter',
    priceTag: 'Read for $0.19',
    readTime: '6 min read',
    image: '/assets/spirits/bento_dark_cognac.jpg',
    bgColor: 'bg-[#1b232e]',
    textColor: 'text-white',
    buttonBg: 'bg-white text-neutral-900 hover:bg-neutral-100',
    spiritNotes: 'Dried Turkish figs, dark cocoa, rancio charentais, and toasted sandalwood.',
    abv: '40.0% ABV · Grande Champagne',
    content:
      'Deep inside ancient chalk cellars along the Charente river, eaux-de-vie rest undisturbed in Limousin oak casks for over four decades. A masterclass in slow evaporative condensation and rancio development.',
  },
  mezcal: {
    id: 'mezcal',
    category: 'ANCESTRAL MEZCAL',
    title: 'Wild Agave from the Oaxacan Sands',
    priceTag: 'Read for $0.29',
    readTime: '5 min read',
    image: '/assets/spirits/bento_desert_mezcal.jpg',
    bgColor: 'from-[#b88c70] via-[#cfab93] to-[#e4cebe]',
    textColor: 'text-white',
    buttonBg: 'bg-white text-neutral-900 hover:bg-neutral-100',
    spiritNotes: 'Smoked mesquite wood, caramelized agave heart, and crushed mountain sage.',
    abv: '48.5% ABV · Espadín & Tobalá',
    content:
      'Harvested only after 14 years of desert maturation, wild Tobalá piñas are roasted in volcanic conical earth pits over river stones and local oak, creating an earthy, mineral-rich agave spirit of unrivaled depth.',
  },
  gin: {
    id: 'gin',
    category: 'BOTANICAL GIN',
    title: 'Alpine Juniper & Cold-Vapour Botanicals',
    priceTag: 'Read for $0.09',
    readTime: '3 min read',
    image: '/assets/spirits/bento_gin_botanicals.jpg',
    bgColor: 'from-[#4ba0bd] via-[#85c3d4] to-[#c7e6ee]',
    textColor: 'text-white',
    buttonBg: 'bg-white text-neutral-900 hover:bg-neutral-100',
    spiritNotes: 'High-altitude wild juniper, coriander seed, angelica root, and fresh lime peel.',
    abv: '43.0% ABV · Vapour Distilled',
    content:
      'Rather than boiling botanicals in the pot, steam vapour passes through a copper basket containing fresh hand-picked mountain botanicals, extracting only the crisp, vibrant terpenes without bitter stewed oils.',
  },
  rose: {
    id: 'rose',
    category: 'APERITIF',
    title: 'Provençal Rose & Elderflower Liqueur',
    priceTag: 'Read for $0.95',
    readTime: '5 min read',
    image: '/assets/spirits/bento_rose_liqueur.jpg',
    bgColor: 'from-[#eea0a3] via-[#f7c5c7] to-[#fae5e6]',
    textColor: 'text-white',
    buttonBg: 'bg-white text-neutral-900 hover:bg-neutral-100',
    spiritNotes: 'Wild organic Damask rose petals, fresh hand-picked elderflower, and Meyer lemon.',
    abv: '20.0% ABV · French Artisanal',
    content:
      'Crafted in Grasse, France using fresh morning-harvested blossoms macerated in pure neutral grape spirit within hours of collection. An ethereal, floral nectar perfect with dry champagne or chilled soda.',
  },
  agave: {
    id: 'agave',
    category: 'HIGHLAND TEQUILA',
    title: 'Sculptural Crystal Blanco in Clear Sunlight',
    priceTag: 'Read for $0.29',
    readTime: '4 min read',
    image: '/assets/spirits/bento_sky_agave.jpg',
    bgColor: 'from-[#4ba1dc] via-[#86c4ed] to-[#cbe7f8]',
    textColor: 'text-white',
    buttonBg: 'bg-white text-neutral-900 hover:bg-neutral-100',
    spiritNotes: 'Crisp green pepper, sweet cooked agave, crushed mint, and saline limestone.',
    abv: '40.0% ABV · 100% Blue Weber',
    content:
      'Distilled exclusively from slow-steamed 8-year highland Blue Weber agave grown in red iron-rich volcanic soils at 2,100 meters elevation. Bottled directly from copper pot distillation for raw crystalline purity.',
  },
};

export const LifestyleBentoGrid: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BentoArticle | null>(null);

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 sm:py-24 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching Screenshot 2 */}
        <div className="mb-10 sm:mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950">
            Lifestyle.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 font-normal max-w-xl">
            The latest and best lifestyle articles selected by our editorial office.
          </p>
        </div>

        {/* Bento Grid: 6 Distinct Cards Matching Screenshot 2 Geometry Exactly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* CARD 1 (Top Left, Wide): The Hand-Carved Ice & Bourbon Old Fashioned */}
          <div
            className={`md:col-span-6 relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${ARTICLES.cocktail.bgColor}`}
          >
            {/* Top Info */}
            <div className="relative z-10 max-w-[60%]">
              <span className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase block">
                {ARTICLES.cocktail.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-1.5 leading-snug">
                {ARTICLES.cocktail.title}
              </h3>
            </div>

            {/* Top-down cocktail glass image on the right with smooth rotate and scale animation */}
            <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-40 sm:w-52 h-40 sm:h-52 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500">
              <img
                src={ARTICLES.cocktail.image}
                alt={ARTICLES.cocktail.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Pill Button */}
            <div className="relative z-10 pt-16">
              <button
                onClick={() => setSelectedArticle(ARTICLES.cocktail)}
                className={`px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 ${ARTICLES.cocktail.buttonBg}`}
              >
                {ARTICLES.cocktail.priceTag}
              </button>
            </div>
          </div>

          {/* CARD 2 (Top Middle, Tall): The Century Reserve XO Decanter */}
          <div
            className={`md:col-span-3 relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1 ${ARTICLES.cognac.bgColor}`}
          >
            {/* Top Info */}
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold tracking-widest text-white/60 uppercase block">
                {ARTICLES.cognac.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-1.5 leading-snug">
                {ARTICLES.cognac.title}
              </h3>
            </div>

            {/* Cognac bottle image with slow upward lift animation */}
            <div className="relative my-4 w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={ARTICLES.cognac.image}
                alt={ARTICLES.cognac.title}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
              />
            </div>

            {/* Bottom Pill Button */}
            <div className="relative z-10">
              <button
                onClick={() => setSelectedArticle(ARTICLES.cognac)}
                className={`px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 ${ARTICLES.cognac.buttonBg}`}
              >
                {ARTICLES.cognac.priceTag}
              </button>
            </div>
          </div>

          {/* CARD 3 (Top Right, Tall): Wild Agave from the Oaxacan Sands */}
          <div
            className={`md:col-span-3 relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${ARTICLES.mezcal.bgColor}`}
          >
            {/* Top Info */}
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase block">
                {ARTICLES.mezcal.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-1.5 leading-snug">
                {ARTICLES.mezcal.title}
              </h3>
            </div>

            {/* Desert Mezcal image with parallax zoom */}
            <div className="relative my-4 w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-md">
              <img
                src={ARTICLES.mezcal.image}
                alt={ARTICLES.mezcal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Bottom Pill Button */}
            <div className="relative z-10">
              <button
                onClick={() => setSelectedArticle(ARTICLES.mezcal)}
                className={`px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 ${ARTICLES.mezcal.buttonBg}`}
              >
                {ARTICLES.mezcal.priceTag}
              </button>
            </div>
          </div>

          {/* CARD 4 (Bottom Left, Vertical): Alpine Juniper & Cold-Vapour Botanicals */}
          <div
            className={`md:col-span-3 relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${ARTICLES.gin.bgColor}`}
          >
            {/* Top Info */}
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase block">
                {ARTICLES.gin.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-1.5 leading-snug">
                {ARTICLES.gin.title}
              </h3>
            </div>

            {/* Gin bottle image with gentle lift */}
            <div className="relative my-4 w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-md">
              <img
                src={ARTICLES.gin.image}
                alt={ARTICLES.gin.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Bottom Pill Button */}
            <div className="relative z-10">
              <button
                onClick={() => setSelectedArticle(ARTICLES.gin)}
                className={`px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 ${ARTICLES.gin.buttonBg}`}
              >
                {ARTICLES.gin.priceTag}
              </button>
            </div>
          </div>

          {/* CARD 5 (Bottom Middle, Vertical): Provençal Rose & Elderflower Liqueur */}
          <div
            className={`md:col-span-3 relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${ARTICLES.rose.bgColor}`}
          >
            {/* Top Info */}
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase block">
                {ARTICLES.rose.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-1.5 leading-snug">
                {ARTICLES.rose.title}
              </h3>
            </div>

            {/* Rose liqueur bottle image */}
            <div className="relative my-4 w-full h-44 sm:h-48 rounded-2xl overflow-hidden shadow-md">
              <img
                src={ARTICLES.rose.image}
                alt={ARTICLES.rose.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Bottom Pill Button */}
            <div className="relative z-10">
              <button
                onClick={() => setSelectedArticle(ARTICLES.rose)}
                className={`px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 ${ARTICLES.rose.buttonBg}`}
              >
                {ARTICLES.rose.priceTag}
              </button>
            </div>
          </div>

          {/* CARD 6 (Bottom Right, Wide): Sculptural Crystal Blanco in Clear Sunlight */}
          <div
            className={`md:col-span-6 relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${ARTICLES.agave.bgColor}`}
          >
            {/* Top Info */}
            <div className="relative z-10 max-w-[65%]">
              <span className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase block">
                {ARTICLES.agave.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-1.5 leading-snug">
                {ARTICLES.agave.title}
              </h3>
            </div>

            {/* Agave spirit bottle on right with parallax zoom */}
            <div className="absolute right-0 bottom-0 w-[55%] sm:w-[50%] h-[75%] rounded-tl-3xl overflow-hidden shadow-2xl">
              <img
                src={ARTICLES.agave.image}
                alt={ARTICLES.agave.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Bottom Pill Button */}
            <div className="relative z-10 pt-20">
              <button
                onClick={() => setSelectedArticle(ARTICLES.agave)}
                className={`px-4 py-2 rounded-full text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 ${ARTICLES.agave.buttonBg}`}
              >
                {ARTICLES.agave.priceTag}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Reader Slide-over / Modal for interactive engagement */}
      <AnimatePresence>
        {selectedArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white rounded-t-[32px] p-6 sm:p-8 z-50 shadow-2xl border-t border-neutral-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    {selectedArticle.category}
                  </span>
                  <span>·</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedArticle.readTime}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-black text-neutral-950">
                  {selectedArticle.title}
                </h3>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      Tasting Profile
                    </span>
                    <span className="font-semibold text-neutral-800">{selectedArticle.spiritNotes}</span>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-200/70 text-neutral-800 shrink-0">
                    {selectedArticle.abv}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  {selectedArticle.content}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">
                  Domingo Reserve Cellar Stories
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Complete Reading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
