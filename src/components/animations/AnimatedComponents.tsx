import React, { useRef, useEffect, ReactNode, forwardRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===== Motion Variants =====

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ===== Animated Components =====

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

// Animated Page Container
export function AnimatedPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated Card with Hover Effect
export function AnimatedCard({
  children,
  className,
  delay = 0,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay, ease: 'power3.out' }
      );
    }
  }, [delay]);

  return (
    <motion.div
      ref={cardRef}
      className={cn('cursor-pointer', className)}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Animated List Container
export function AnimatedList({ children, className }: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}

// Animated List Item
export function AnimatedListItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
      custom={index}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  duration = 1.5,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (counterRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      const counter = { value: 0 };
      gsap.to(counter, {
        value,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
          }
        },
      });
    }
  }, [value, prefix, suffix, decimals, duration]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

// Animated Progress Bar
export function AnimatedProgress({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        { width: `${value}%`, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, [value]);

  return (
    <div className={cn('w-full h-3 bg-gray-200 rounded-full overflow-hidden', className)}>
      <div
        ref={barRef}
        className={cn(
          'h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full',
          barClassName
        )}
      />
    </div>
  );
}

// Animated Button with Ripple Effect
export function AnimatedButton({
  children,
  className,
  onClick,
  variant = 'primary',
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
    `;

    button.appendChild(ripple);

    gsap.to(ripple, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden px-6 py-3 rounded-lg font-medium shadow-lg',
        'transition-all duration-300 ease-out',
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={(e) => {
        if (!disabled) {
          createRipple(e);
          onClick?.(e);
        }
      }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// Animated Modal/Dialog
export function AnimatedModal({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
              'bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4',
              className
            )}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Animated Notification/Toast
export function AnimatedToast({
  isVisible,
  message,
  type = 'info',
  onClose,
}: {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && toastRef.current && type === 'error') {
      gsap.to(toastRef.current, {
        keyframes: [
          { x: -8, duration: 0.05 },
          { x: 8, duration: 0.05 },
          { x: -8, duration: 0.05 },
          { x: 8, duration: 0.05 },
          { x: 0, duration: 0.1 },
        ],
      });
    }
  }, [isVisible, type]);

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={toastRef}
          className={cn(
            'fixed top-4 right-4 px-6 py-4 rounded-lg text-white shadow-xl z-50',
            typeClasses[type]
          )}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3">
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-70">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Animated Skeleton Loader
export function AnimatedSkeleton({ className }: { className?: string }) {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skeletonRef.current) {
      gsap.to(skeletonRef.current, {
        backgroundPosition: '200% 0',
        duration: 1.5,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div
      ref={skeletonRef}
      className={cn(
        'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg',
        'bg-[length:200%_100%]',
        className
      )}
    />
  );
}

// Animated Stats Card
export function AnimatedStatsCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  delay = 0,
  className,
}: {
  title: string;
  value: number;
  icon?: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimatedCard delay={delay} className={cn('p-6 bg-white rounded-xl shadow-lg', className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        {icon && <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <AnimatedCounter value={value} className="text-3xl font-bold text-gray-900" />
        {trend && trendValue && (
          <motion.span
            className={cn(
              'text-sm font-medium',
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5, duration: 0.3 }}
          >
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </motion.span>
        )}
      </div>
    </AnimatedCard>
  );
}

// Animated Table Row
export function AnimatedTableRow({
  children,
  index = 0,
  className,
  onClick,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
}) {
  const rowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (rowRef.current) {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, delay: index * 0.05, ease: 'power2.out' }
      );
    }
  }, [index]);

  return (
    <motion.tr
      ref={rowRef}
      className={cn('transition-colors', className)}
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
      onClick={onClick}
    >
      {children}
    </motion.tr>
  );
}

// Animated Floating Action Button
export function AnimatedFAB({
  icon,
  onClick,
  className,
}: {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (fabRef.current) {
      gsap.fromTo(
        fabRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  return (
    <motion.button
      ref={fabRef}
      className={cn(
        'fixed bottom-6 right-6 w-14 h-14 rounded-full',
        'bg-gradient-to-r from-blue-500 to-purple-600',
        'text-white shadow-xl flex items-center justify-center',
        'z-40',
        className
      )}
      whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  );
}

// Animated Badge/Tag
export function AnimatedBadge({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}) {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variantClasses[variant],
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.span>
  );
}

// Animated Chart Bar
export function AnimatedChartBar({
  height,
  color = 'bg-blue-500',
  delay = 0,
  className,
}: {
  height: number;
  color?: string;
  delay?: number;
  className?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, delay, ease: 'power3.out' }
      );
    }
  }, [delay]);

  return (
    <div
      ref={barRef}
      className={cn('w-full rounded-t-lg origin-bottom', color, className)}
      style={{ height: `${height}%` }}
    />
  );
}

// Animated Accordion Item
export function AnimatedAccordion({
  title,
  children,
  isOpen,
  onToggle,
  className,
}: {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <motion.button
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
        onClick={onToggle}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-medium">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Loading Spinner
export function AnimatedSpinner({ size = 40, className }: { size?: number; className?: string }) {
  const spinnerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <svg
      ref={spinnerRef}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={className}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        className="opacity-30"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        strokeDashoffset="75"
      />
    </svg>
  );
}

// Animated Dots Loader
export function AnimatedDots({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-current rounded-full"
          animate={{ y: [-5, 5] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Animated Gradient Text
export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
        'bg-clip-text text-transparent bg-[length:200%_auto]',
        className
      )}
      animate={{ backgroundPosition: ['0% center', '200% center'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}

// Animated Icon Button
export function AnimatedIconButton({
  icon,
  onClick,
  className,
  tooltip,
}: {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}) {
  return (
    <motion.button
      className={cn(
        'p-2 rounded-lg hover:bg-gray-100 relative group',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {icon}
      {tooltip && (
        <motion.span
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ y: 5 }}
          whileHover={{ y: 0 }}
        >
          {tooltip}
        </motion.span>
      )}
    </motion.button>
  );
}

// Page Transition Wrapper
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
