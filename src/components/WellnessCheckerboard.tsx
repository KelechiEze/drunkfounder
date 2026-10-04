import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Flame, Droplets, Compass } from 'lucide-react';

interface SpiritCellarDetail {
  id: string;
  title: string;
  summary: string;
  fullBody: string;
  metrics: string[];
  caskType: string;
}

const DETAILS: Record<string, SpiritCellarDetail> = {
  whiskey: {
    id: 'whiskey',
    title: 'Cask Aging & Oak Extraction',
    summary: 'Unlock deep insights into charred oak maturation, ester development, and slow barrel micro-oxygenation.',
    fullBody:
      'During 12 years of seasonal temperature swings, Kentucky straight bourbon breathes deep into charred American white oak staves. The char layer acts as an activated charcoal filter while caramelizing wood sugars into rich vanillin, lactones, and toasted baking spice notes.',
    metrics: ['Alligator Char No. 4', '53-Gallon White Oak', '12 Years Aged'],
    caskType: 'Charred American White Oak',
  },
  gin: {
    id: 'gin',
    title: 'Copper Vapour Distillation',
    summary: 'Master botanical vapour infusion, capturing delicate alpine juniper, citrus oils, and wild florals.',
    fullBody:
      'Rather than stewing botanicals in boiling neutral spirit, pure spirit vapour rises through a handcrafted copper botanical basket suspended in the still neck. This cold vapour extraction preserves volatile monoterpenes and fresh lemon zest vibrancy.',
    metrics: ['14 Hand-Harvested Botanicals', 'Vapour Basket Infusion', 'Pure Copper Alembic'],
    caskType: 'Vapour-Infused Copper Pot Still',
  },
  cognac: {
    id: 'cognac',
    title: 'Cellar Rancio & Evaporation',
    summary: 'Explore century-old underground French chalk cellars, natural humidity, and the legendary angels’ share.',
    fullBody:
      'Stored in dark, humid underground cellars along the Charente river, fine eaux-de-vie undergo slow oxidative esterification. Over 40 years, evaporation concentrates natural fruit sweetness into deep notes of dried figs, leather, rancio, and dark chocolate.',
    metrics: ['40+ Years Maturation', 'Limousin Oak Casks', '2.5% Annual Angel’s Share'],
    caskType: 'Century-Old Limousin Oak',
  },
  mezcal: {
    id: 'mezcal',
    title: 'Ancestral Agave & Volcanic Terroir',
    summary: 'Discover underground pit roasting with volcanic basalt, wild yeasts, and open-air pine fermentation.',
    fullBody:
      'Wild-foraged Tobalá and Espadín agaves grow for up to 14 years on arid Oaxaca mountain slopes. The piñas are slow-roasted in conical stone pits beneath river rocks, wild-fermented in open pine vats, and double-distilled in clay pots for peerless mineral complexity.',
    metrics: ['14-Year Wild Tobalá', 'Underground Conical Roasting', 'Raw Basalt Stone & Clay'],
    caskType: 'Ancestral Clay Pot Still',
  },
};

export const WellnessCheckerboard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<SpiritCellarDetail | null>(null);

  return (
    <section className="relative w-full bg-white text-neutral-900 py-20 sm:py-24 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Outer frame matching Screenshot 3 */}
        <div className="rounded-[36px] bg-white border border-neutral-200/90 p-4 sm:p-6 md:p-8 shadow-xl">
          {/* 8-Tile Checkerboard Grid: 2 Rows x 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* ROW 1: TILE 1 (PHOTO - Luxury Whiskey Bottle & Tumbler in Lounge) */}
            <div className="relative rounded-[26px] overflow-hidden h-[240px] sm:h-[260px] md:h-[280px] shadow-sm group cursor-pointer">
              <img
                src="/assets/spirits/checker_whiskey_lounge.jpg"
                alt="Single malt whiskey bottle with crystal rocks glass in luxury library bar"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Single Barrel Reserve
                </span>
              </div>
            </div>

            {/* ROW 1: TILE 2 (TEXT CARD - Off-White Barrel Aging) */}
            <div className="relative rounded-[26px] bg-[#fbf9f6] p-7 sm:p-8 flex flex-col justify-between border border-neutral-200/60 shadow-2xs group hover:border-neutral-300 transition-all h-[240px] sm:h-[260px] md:h-[280px]">
              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 leading-tight">
                  Barrel
                  <br />
                  Aging
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Unlock deep insights into charred oak maturation, ester development, and slow barrel micro-oxygenation.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setActiveModal(DETAILS.whiskey)}
                  className="text-xs font-semibold text-neutral-800 underline underline-offset-4 hover:text-neutral-950 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>More Information</span>
                </button>
              </div>
            </div>

            {/* ROW 1: TILE 3 (PHOTO - Botanical Gin Distillery Still) */}
            <div className="relative rounded-[26px] overflow-hidden h-[240px] sm:h-[260px] md:h-[280px] shadow-sm group cursor-pointer">
              <img
                src="/assets/spirits/checker_gin_distillery.jpg"
                alt="Artisanal gin bottle on copper distillery counter with botanicals"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow">
                  <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                  Copper Alembic Vapour
                </span>
              </div>
            </div>

            {/* ROW 1: TILE 4 (TEXT CARD - Deep Charcoal Botanical Distillation) */}
            <div className="relative rounded-[26px] bg-[#1c222c] text-white p-7 sm:p-8 flex flex-col justify-between shadow-md h-[240px] sm:h-[260px] md:h-[280px]">
              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  Botanical
                  <br />
                  Distillation
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                  Seamlessly extract delicate alpine juniper, coriander seed, and citrus oils with low-temperature vapour baskets.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setActiveModal(DETAILS.gin)}
                  className="text-xs font-semibold text-white/90 underline underline-offset-4 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>More Information</span>
                </button>
              </div>
            </div>

            {/* ROW 2: TILE 1 (TEXT CARD - Muted Slate Blue Cellar Maturation) */}
            <div className="relative rounded-[26px] bg-[#637a87] text-white p-7 sm:p-8 flex flex-col justify-between shadow-md h-[240px] sm:h-[260px] md:h-[280px]">
              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  Cellar
                  <br />
                  Maturation
                </h3>
                <p className="text-xs sm:text-sm text-white/85 font-normal leading-relaxed">
                  Elevate your palate with century-old French oak resting cellars, fostering profound rancio and honeyed elegance.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setActiveModal(DETAILS.cognac)}
                  className="text-xs font-semibold text-white/95 underline underline-offset-4 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>More Information</span>
                </button>
              </div>
            </div>

            {/* ROW 2: TILE 2 (PHOTO - French Oak Barrel Cellar & Cognac Bottle in Candlelight) */}
            <div className="relative rounded-[26px] overflow-hidden h-[240px] sm:h-[260px] md:h-[280px] shadow-sm group cursor-pointer">
              <img
                src="/assets/spirits/checker_cellar_cognac.jpg"
                alt="Vintage cognac bottle in dark oak barrel aging cellar with candlelight"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Grand Cru Eaux-de-Vie
                </span>
              </div>
            </div>

            {/* ROW 2: TILE 3 (TEXT CARD - Off-White Ancestral Terroir) */}
            <div className="relative rounded-[26px] bg-[#fbf9f6] p-7 sm:p-8 flex flex-col justify-between border border-neutral-200/60 shadow-2xs group hover:border-neutral-300 transition-all h-[240px] sm:h-[260px] md:h-[280px]">
              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 leading-tight">
                  Ancestral
                  <br />
                  Terroir
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Explore highland volcanic soils, wild mountain agaves, and centuries of open pine fermentation heritage.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setActiveModal(DETAILS.mezcal)}
                  className="text-xs font-semibold text-neutral-800 underline underline-offset-4 hover:text-neutral-950 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>More Information</span>
                </button>
              </div>
            </div>

            {/* ROW 2: TILE 4 (PHOTO - Oaxaca Mezcal Bottle on Volcanic Stone at Sunset) */}
            <div className="relative rounded-[26px] overflow-hidden h-[240px] sm:h-[260px] md:h-[280px] shadow-sm group cursor-pointer">
              <img
                src="/assets/spirits/checker_mezcal_sunset.jpg"
                alt="Artisanal mezcal bottle on black volcanic stone at golden sunset"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  Oaxaca Volcanic Terroir
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for "More Information" clicks */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 z-50 shadow-2xl border border-neutral-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Master Distiller Cellar Notes
                </span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-5 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">
                    {activeModal.caskType}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-neutral-950 mt-0.5">
                    {activeModal.title}
                  </h3>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                  {activeModal.fullBody}
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeModal.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-[11px] font-bold text-neutral-800 text-center"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Close Cellar Archive
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
