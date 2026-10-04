import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 45;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        setOrderComplete(false);
        onClearCart();
        onClose();
      }, 2600);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Slide-over Drawer with Pure White Background */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white text-neutral-900 z-50 shadow-2xl flex flex-col border-l border-neutral-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-xl font-bold tracking-tight text-neutral-950">Your Cart</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-6 py-3 bg-neutral-50/80 border-b border-neutral-100 text-xs">
              <div className="flex justify-between items-center mb-1.5 font-medium">
                <span>
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free cold-chain courier delivery unlocked!
                    </span>
                  ) : (
                    <span className="text-neutral-600">
                      Add <strong className="text-neutral-950">${remainingForFreeShipping.toFixed(2)}</strong> for Free Cold-Chain Delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-neutral-400 font-semibold">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3.5 bg-white">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold font-display text-neutral-950">Order Confirmed!</h3>
                  <p className="text-sm text-neutral-500 mt-2 max-w-xs">
                    Your fresh cold-pressed bottles are being freshly packed in our temperature-controlled cold pack.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-400">
                  <p className="text-sm font-medium">Your basket is currently empty.</p>
                  <p className="text-xs text-neutral-400 mt-1">Explore our 01 Renew, 02 Revive & 03 Refuel elixirs above!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 flex items-center gap-4 group transition-colors hover:border-neutral-300"
                  >
                    <div className="w-14 h-18 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-neutral-100 shadow-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate text-neutral-950">{item.name}</h4>
                      <p className="text-xs text-neutral-500">{item.volume}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-md bg-white shadow-2xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-neutral-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-sm text-neutral-950">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !orderComplete && (
              <div className="p-6 border-t border-neutral-100 bg-white space-y-4">
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-neutral-950 font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cold-Chain Shipping</span>
                    <span>{remainingForFreeShipping === 0 ? 'FREE' : '$4.99'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100 text-base font-black text-neutral-950">
                  <span>Total</span>
                  <span>
                    ${(subtotal + (remainingForFreeShipping === 0 ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 active:scale-[0.99] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Processing Cold Order...</span>
                  ) : (
                    <>
                      <span>Secure Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Raw Fresh Guarantee · Refrigerated Express</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
