import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Check, Shield, RefreshCcw, Heart, Globe, Volume2 } from 'lucide-react';
import { playHarmonicTone, playClickSound } from '../utils/sound';

interface FooterProps {
  onNavClick: (item: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const [email, setEmail] = useState('');
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  const [memberStamp, setMemberStamp] = useState<string | null>(null);

  const handleFrequencyClick = (freq: number) => {
    setActiveFrequency(freq);
    playHarmonicTone(freq);
    setTimeout(() => setActiveFrequency(null), 1200);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    playClickSound();
    const stampId = `DOM-GUILD-${Math.floor(1000 + Math.random() * 9000)}`;
    setMemberStamp(stampId);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white text-neutral-900 overflow-hidden border-t border-neutral-100">
      {/* Torn / Ripped Paper Top Edge Effect */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-[1px]">
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="w-full h-4 sm:h-6 text-white fill-current block"
        >
          <path d="M0,20 Q30,4 70,16 T150,8 T230,18 T310,6 T400,18 T480,5 T570,20 T650,8 T740,21 T820,9 T910,19 T990,6 T1070,18 T1150,8 L1200,16 L1200,24 L0,24 Z" />
        </svg>
      </div>

      {/* Dual Kinetic Marquees in Neutral Minimalist Style */}
      <div className="w-full border-b border-neutral-100 overflow-hidden select-none bg-neutral-50/60 py-4 sm:py-6 space-y-1">
        {/* Track 1: Left */}
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900/10 uppercase mr-8">
            CRAFTED IN SUNLIGHT · EXTRACTED IN ICE · ZERO HEAT DEGRADATION ·
          </span>
          <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900/10 uppercase mr-8">
            CRAFTED IN SUNLIGHT · EXTRACTED IN ICE · ZERO HEAT DEGRADATION ·
          </span>
        </div>

        {/* Track 2: Right */}
        <div className="flex whitespace-nowrap animate-marquee" style={{ animationDirection: 'reverse' }}>
          <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900/10 uppercase mr-8">
            BIOPHOTONIC UV VITRIFICATION · 100% RAW BOTANICAL ENZYMES · NO REFINED SUGARS ·
          </span>
          <span className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900/10 uppercase mr-8">
            BIOPHOTONIC UV VITRIFICATION · 100% RAW BOTANICAL ENZYMES · NO REFINED SUGARS ·
          </span>
        </div>
      </div>

      {/* Main Editorial Body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-16 pb-12 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-neutral-200">
          {/* Brand Manifesto & Botanical Frequency Chamber (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-display text-3xl sm:text-4xl font-black tracking-wider uppercase text-neutral-950 block">
                DOMINGO
              </span>
              <p className="text-xs text-neutral-500 tracking-widest uppercase mt-1 font-semibold">
                Circadian Botanical Extraction Lab · Est. 2026
              </p>
            </div>

            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed font-normal">
              Hand-pressed botanical tonics tuned to circadian biology. Every bottle is cold-macerated at 3.8°C and sealed under nitrogen in biophotonic glass.
            </p>

            {/* Interactive Circadian Sonic Synthesizer */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-2xs space-y-2.5 max-w-sm">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Bio-Acoustic Frequencies</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-normal">Tap to tune</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: '432 Hz', note: 'Cellular Grounding', freq: 432 },
                  { label: '528 Hz', note: 'DNA Repair', freq: 528 },
                  { label: '639 Hz', note: 'Equilibrium', freq: 639 },
                ].map((item) => (
                  <button
                    key={item.freq}
                    onClick={() => handleFrequencyClick(item.freq)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      activeFrequency === item.freq
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                        : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Dispatch Registration */}
            <div className="pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-800 block mb-1">
                The Botanical Dispatch
              </span>
              <p className="text-xs text-neutral-500 mb-3">
                Weekly cold-press harvest reports, limited micro-vintage reservations, and circadian guides.
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for allocation alerts"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-neutral-950 text-white font-bold text-xs tracking-wide hover:bg-neutral-800 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Enlist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {memberStamp && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-950 block">Enlisted in Botanical Guild</span>
                    <span className="font-mono text-[10px] text-emerald-700">Serial Stamp: {memberStamp}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-normal">
            {/* Col 1: Elixirs */}
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-xs">
                The Elixirs
              </h4>
              <ul className="space-y-2.5 text-neutral-600 font-medium">
                <li>
                  <button onClick={() => onNavClick('Cleanses')} className="hover:text-neutral-950 transition-colors cursor-pointer text-left">
                    01 Renew · Valencia Orange
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('Cleanses')} className="hover:text-neutral-950 transition-colors cursor-pointer text-left">
                    02 Revive · Nordic Bilberry
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('Cleanses')} className="hover:text-neutral-950 transition-colors cursor-pointer text-left">
                    03 Refuel · Criollo Cacao
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('Daily Bundles')} className="hover:text-neutral-950 transition-colors cursor-pointer text-left">
                    Circadian Trio Cleanse
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('Collections')} className="hover:text-neutral-950 transition-colors cursor-pointer text-left">
                    The Reserve Cellar
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: The Science */}
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-xs">
                Cold Science
              </h4>
              <ul className="space-y-2.5 text-neutral-600 font-medium">
                <li>
                  <a href="#circadian-process-section" className="hover:text-neutral-950 transition-colors">
                    Hydrodynamic Extraction
                  </a>
                </li>
                <li>
                  <a href="#circadian-process-section" className="hover:text-neutral-950 transition-colors">
                    Acoustic Cavitation
                  </a>
                </li>
                <li>
                  <a href="#circadian-process-section" className="hover:text-neutral-950 transition-colors">
                    Miron UV Vitrification
                  </a>
                </li>
                <li>
                  <span className="hover:text-neutral-950 transition-colors">Spectrometry Verification</span>
                </li>
                <li>
                  <span className="hover:text-neutral-950 transition-colors">72h Live Viability</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Estates & Sustainability */}
            <div className="space-y-3">
              <h4 className="font-bold text-neutral-950 uppercase tracking-wider text-xs">
                Estate Terroir
              </h4>
              <ul className="space-y-2.5 text-neutral-600 font-medium">
                <li>
                  <span className="hover:text-neutral-950 transition-colors">Ojai Valley Citrus Groves</span>
                </li>
                <li>
                  <span className="hover:text-neutral-950 transition-colors">Lapland Arctic Bilberry</span>
                </li>
                <li>
                  <span className="hover:text-neutral-950 transition-colors">Uji Kyoto Stone Mills</span>
                </li>
                <li>
                  <span className="hover:text-neutral-950 transition-colors">Zero Single-Use Plastics</span>
                </li>
                <li>
                  <span className="hover:text-neutral-950 transition-colors">Certified B-Corporation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ethical Badges & Values Bar */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-neutral-200 text-xs text-neutral-800 font-semibold">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Raw & Cold-Chain Dosed</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Biophotonic UV Glass Return Program</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600 shrink-0" />
            <span>Zero Added Sugars or Emulsifiers</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Carbon Neutral Courier</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-medium">
          <div className="flex items-center gap-4">
            <span>© 2026 DOMINGO BOTANICALS INC. ALL RIGHTS RESERVED.</span>
            <span>·</span>
            <span className="hover:text-neutral-900 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-neutral-900 cursor-pointer">Terms of Service</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer group font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
