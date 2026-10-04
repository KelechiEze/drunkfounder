import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES } from './data/slides';
import { CartItem } from './types';
import { Header } from './components/Header';
import { SlideCarousel } from './components/SlideCarousel';
import { BottomSection } from './components/BottomSection';
import { ProductShowcaseCarousel } from './components/ProductShowcaseCarousel';
import { LifestyleBentoGrid } from './components/LifestyleBentoGrid';
import { WellnessCheckerboard } from './components/WellnessCheckerboard';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { playSpinWhoosh, playClickSound, playAddSuccessSound } from './utils/sound';
import { Check } from 'lucide-react';

const SLIDE_DURATION_MS = 5000;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [triggerSpinCount, setTriggerSpinCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '01-renew-6pack',
      slideId: '01',
      name: 'RENEW Weekly 6-Pack',
      volume: '6 x 330 ml',
      price: 36.0,
      quantity: 1,
      image: '/assets/bottle-3.png',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [soundEnabled] = useState(true);
  const [isAutoPlay] = useState(true);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [activeNav, setActiveNav] = useState('Shop now');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Trigger 360-Degree Forward Spin in position
  const handleTriggerSpin = useCallback(() => {
    setTriggerSpinCount((prev) => prev + 1);
    playSpinWhoosh(soundEnabled);
  }, [soundEnabled]);

  // Navigate to Next Slide with 360-Degree Forward Spin in position
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setTriggerSpinCount((prev) => prev + 1);
    setAutoPlayProgress(0);
    playSpinWhoosh(soundEnabled);
  }, [soundEnabled]);

  // Navigate to Previous Slide with 360-Degree Forward Spin in position
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTriggerSpinCount((prev) => prev + 1);
    setAutoPlayProgress(0);
    playSpinWhoosh(soundEnabled);
  }, [soundEnabled]);

  // Select Direct Slide
  const handleSelectSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) {
        handleTriggerSpin();
        return;
      }
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setTriggerSpinCount((prev) => prev + 1);
      setAutoPlayProgress(0);
      playSpinWhoosh(soundEnabled);
    },
    [currentIndex, handleTriggerSpin, soundEnabled]
  );

  // Automatic slide rotation timer with continuous progress
  useEffect(() => {
    if (!isAutoPlay) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setAutoPlayProgress(0);
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / SLIDE_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setAutoPlayProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlay, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        handleTriggerSpin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleTriggerSpin]);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    playAddSuccessSound(soundEnabled);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });
    showToast(`Added ${newItem.name} to cart!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    playClickSound(soundEnabled);
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    playClickSound(soundEnabled);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    playClickSound(soundEnabled);
    if (nav === 'Shop now') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'Cleanses') {
      const el = document.getElementById('product-showcase-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'Daily Bundles') {
      const el = document.getElementById('bottom-bundles-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'Collections') {
      const el = document.getElementById('lifestyle-bento-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'Account') {
      showToast('Domingo Member Portal · Welcome back!');
    }
  };

  const currentSlide = SLIDES[currentIndex];
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-neutral-900/95 text-white text-xs font-semibold backdrop-blur-md shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: FULL WIDTH HERO (360° Forward Spinning Bottle & Floating Fruit Parallax) */}
      <div
        className="w-full flex-1 flex flex-col justify-start transition-colors duration-700 relative overflow-hidden"
        style={{ backgroundColor: currentSlide.bgColor }}
      >
        {/* Navigation Header spanning full width */}
        <div className="w-full">
          <Header
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onNavClick={handleNavClick}
            activeNav={activeNav}
          />
        </div>

        {/* Hero Slider with 360° Forward Spinning Bottle & Diagonal Floating Fruits (Full Width) */}
        <main className="w-full pb-0 flex-1 flex flex-col justify-center">
          <SlideCarousel
            slides={SLIDES}
            currentIndex={currentIndex}
            direction={direction}
            onPrev={handlePrev}
            onNext={handleNext}
            onSelectSlide={handleSelectSlide}
            triggerSpinCount={triggerSpinCount}
            onTriggerSpin={handleTriggerSpin}
            onAddToCart={handleAddToCart}
            soundEnabled={soundEnabled}
            autoPlayProgress={autoPlayProgress}
          />
        </main>
      </div>

      {/* SECTION 2: Organic Torn Paper Deckle-Edge Transition into Daily Bundles / Ingredients */}
      <section id="bottom-bundles-section" className="w-full">
        <BottomSection
          currentSlide={currentSlide}
          onAddToCart={handleAddToCart}
          onSelectSlide={handleSelectSlide}
        />
      </section>

      {/* SECTION 3: Screenshot 1 - Featured Product Showcase with 360° Spin, Squircle Cards Carousel */}
      <section id="product-showcase-section" className="w-full">
        <ProductShowcaseCarousel onAddToCart={handleAddToCart} />
      </section>

      {/* SECTION 4: Screenshot 2 - Lifestyle. Editorial Bento Grid with 6 Cards & Read Pills */}
      <section id="lifestyle-bento-section" className="w-full">
        <LifestyleBentoGrid />
      </section>

      {/* SECTION 5: Screenshot 3 - Wellness & Circadian 8-Tile Checkerboard Grid */}
      <section id="wellness-checkerboard-section" className="w-full">
        <WellnessCheckerboard />
      </section>

      {/* SECTION 6: High-End Editorial Domingo Footer with Pure White Background */}
      <Footer onNavClick={handleNavClick} />

      {/* Slide-Over Pure White Background Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
