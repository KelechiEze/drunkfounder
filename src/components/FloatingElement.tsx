import React from 'react';
import { motion } from 'motion/react';
import { FloatingElement as FloatingElementType } from '../types';

interface FloatingElementProps {
  element: FloatingElementType;
  slideKey: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ element, slideKey }) => {
  const { floatConfig, className, size, image, name, layer } = element;

  return (
    <motion.div
      key={`${slideKey}-${element.id}`}
      initial={{
        opacity: 0,
        scale: 0.7,
        x: floatConfig.xRange[0] * 2,
        y: floatConfig.yRange[0] * 2,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: floatConfig.xRange,
        y: floatConfig.yRange,
        rotate: floatConfig.rotateRange,
      }}
      exit={{
        opacity: 0,
        scale: 0.6,
        y: floatConfig.yRange[1] * 2,
        transition: { duration: 0.4 },
      }}
      transition={{
        // Smooth initial entry
        opacity: { duration: 0.6, delay: floatConfig.delay },
        scale: { duration: 0.6, delay: floatConfig.delay, ease: 'easeOut' },
        // Continuous diagonal hovering motion
        x: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: floatConfig.duration,
          ease: 'easeInOut',
          delay: floatConfig.delay,
        },
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: floatConfig.duration * 0.9,
          ease: 'easeInOut',
          delay: floatConfig.delay,
        },
        rotate: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: floatConfig.duration * 1.1,
          ease: 'easeInOut',
          delay: floatConfig.delay,
        },
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.25 },
      }}
      className={`absolute pointer-events-auto cursor-pointer ${className} ${
        layer === 'front' ? 'z-30' : 'z-10'
      }`}
      style={{
        transformOrigin: 'center center',
      }}
    >
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className={`${size.width} ${size.height} object-contain filter-drop-shadow-ambient select-none transition-transform duration-300 group-hover:brightness-105`}
          draggable={false}
        />
        {/* Subtle tooltip on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-white whitespace-nowrap backdrop-blur-sm shadow-md">
          {name}
        </div>
      </div>
    </motion.div>
  );
};
