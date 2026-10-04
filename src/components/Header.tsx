import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavClick: (item: string) => void;
  activeNav: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onNavClick,
  activeNav,
}) => {
  const navItems = ['Shop now', 'Cleanses', 'Daily Bundles', 'Collections'];

  return (
    <header className="relative z-40 w-full px-6 sm:px-10 md:px-14 lg:px-16 pt-6 pb-4 flex items-center justify-between text-white/95">
      {/* Brand Wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="font-display text-2xl md:text-3xl font-black tracking-wider uppercase drop-shadow-sm hover:opacity-90 transition-opacity"
          aria-label="DOMINGO Home"
        >
          DOMINGO
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-semibold tracking-wide">
        {navItems.map((item) => {
          const isActive = activeNav === item;
          return (
            <button
              key={item}
              onClick={() => onNavClick(item)}
              className={`relative py-1 transition-all duration-200 cursor-pointer ${
                isActive ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Account & Cart Bag matching video */}
      <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
        {/* Account Link */}
        <button
          onClick={() => onNavClick('Account')}
          className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm font-semibold tracking-wide"
        >
          Account
        </button>

        {/* Shopping Cart Bag */}
        <button
          onClick={onOpenCart}
          className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-white cursor-pointer flex items-center justify-center"
          aria-label={`Shopping bag with ${cartCount} items`}
        >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-white text-black font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
