import gsap from 'gsap';

// ===== GSAP Animation Configurations =====

// Page Transition Animations
export const pageTransitions = {
  fadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
  },
  fadeOut: {
    from: { opacity: 1, y: 0 },
    to: { opacity: 0, y: -30, duration: 0.4, ease: 'power3.in' },
  },
  slideInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
  },
  slideInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
  },
};

// Card Animations
export const cardAnimations = {
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    duration: 0.3,
    ease: 'power2.out',
  },
  unhover: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    duration: 0.3,
    ease: 'power2.out',
  },
  enter: {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
  },
};

// Button Animations
export const buttonAnimations = {
  click: {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.in',
  },
  release: {
    scale: 1,
    duration: 0.2,
    ease: 'elastic.out(1, 0.5)',
  },
  success: {
    keyframes: [
      { scale: 1.1, backgroundColor: '#10B981', duration: 0.2 },
      { scale: 1, duration: 0.3 },
    ],
    ease: 'power2.out',
  },
};

// List/Stagger Animations
export const staggerAnimations = {
  container: {
    stagger: 0.08,
    ease: 'power3.out',
  },
  item: {
    from: { opacity: 0, y: 30, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.5 },
  },
};

// Modal/Dialog Animations
export const modalAnimations = {
  overlay: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.3, ease: 'power2.out' },
  },
  content: {
    from: { opacity: 0, scale: 0.9, y: 20 },
    to: { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    duration: 0.25,
    ease: 'power2.in',
  },
};

// Notification/Toast Animations
export const notificationAnimations = {
  slideIn: {
    from: { opacity: 0, x: 100, scale: 0.9 },
    to: { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
  },
  slideOut: {
    x: 100,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
  },
  success: {
    keyframes: [
      { backgroundColor: '#10B981', scale: 1.02, duration: 0.2 },
      { scale: 1, duration: 0.2 },
    ],
  },
  error: {
    keyframes: [
      { x: -10, duration: 0.05 },
      { x: 10, duration: 0.05 },
      { x: -10, duration: 0.05 },
      { x: 10, duration: 0.05 },
      { x: 0, duration: 0.1 },
    ],
  },
};

// Number Counter Animation
export const counterAnimation = {
  duration: 1.5,
  ease: 'power2.out',
};

// Progress Bar Animation
export const progressAnimations = {
  fill: {
    duration: 1,
    ease: 'power2.out',
  },
  pulse: {
    keyframes: [
      { opacity: 0.7, duration: 0.5 },
      { opacity: 1, duration: 0.5 },
    ],
    repeat: -1,
    yoyo: true,
  },
};

// Chart Animations
export const chartAnimations = {
  bar: {
    from: { scaleY: 0, transformOrigin: 'bottom' },
    to: { scaleY: 1, duration: 0.8, ease: 'power3.out' },
  },
  line: {
    from: { strokeDashoffset: 1000 },
    to: { strokeDashoffset: 0, duration: 2, ease: 'power2.out' },
  },
  pie: {
    from: { scale: 0, rotation: -180 },
    to: { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
  },
};

// Table Row Animations
export const tableAnimations = {
  rowEnter: {
    from: { opacity: 0, x: -20, backgroundColor: 'rgba(59, 130, 246, 0.1)' },
    to: { opacity: 1, x: 0, backgroundColor: 'transparent', duration: 0.4, ease: 'power2.out' },
  },
  rowHover: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    duration: 0.2,
  },
  rowSelect: {
    keyframes: [
      { backgroundColor: 'rgba(59, 130, 246, 0.2)', scale: 1.01, duration: 0.2 },
      { scale: 1, duration: 0.2 },
    ],
  },
};

// Loading Animations
export const loadingAnimations = {
  spinner: {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'none',
  },
  skeleton: {
    keyframes: [
      { opacity: 0.4, duration: 0.8 },
      { opacity: 1, duration: 0.8 },
    ],
    repeat: -1,
    yoyo: true,
  },
  dots: {
    y: -10,
    duration: 0.4,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
  },
};

// Floating Action Button Animations
export const fabAnimations = {
  enter: {
    from: { scale: 0, rotation: -180 },
    to: { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' },
  },
  pulse: {
    keyframes: [
      { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)', duration: 0 },
      { boxShadow: '0 0 0 20px rgba(59, 130, 246, 0)', duration: 1.5 },
    ],
    repeat: -1,
  },
};

// Sidebar Animations
export const sidebarAnimations = {
  expand: {
    width: 280,
    duration: 0.3,
    ease: 'power2.out',
  },
  collapse: {
    width: 80,
    duration: 0.3,
    ease: 'power2.out',
  },
  menuItem: {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
  },
};

// ===== GSAP Animation Utility Functions =====

// Animate element entrance
export function animateEnter(
  element: HTMLElement | null,
  animation: { from: gsap.TweenVars; to: gsap.TweenVars }
) {
  if (!element) return;
  return gsap.fromTo(element, animation.from, animation.to);
}

// Animate element with stagger
export function animateStagger(
  elements: HTMLElement[] | NodeListOf<Element> | null,
  animation: { from: gsap.TweenVars; to: gsap.TweenVars },
  stagger = 0.1
) {
  if (!elements) return;
  return gsap.fromTo(elements, animation.from, { ...animation.to, stagger });
}

// Animate counter
export function animateCounter(
  element: HTMLElement | null,
  endValue: number,
  options: { duration?: number; prefix?: string; suffix?: string; decimals?: number } = {}
) {
  if (!element) return;
  const { duration = 1.5, prefix = '', suffix = '', decimals = 0 } = options;
  
  const counter = { value: 0 };
  return gsap.to(counter, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
    },
  });
}

// Hover animation
export function setupHoverAnimation(
  element: HTMLElement | null,
  hoverIn: gsap.TweenVars,
  hoverOut: gsap.TweenVars
) {
  if (!element) return;
  
  element.addEventListener('mouseenter', () => gsap.to(element, hoverIn));
  element.addEventListener('mouseleave', () => gsap.to(element, hoverOut));
}

// Scroll trigger animation
export function animateOnScroll(
  element: HTMLElement | null,
  animation: gsap.TweenVars,
  triggerOptions: { start?: string; end?: string; scrub?: boolean } = {}
) {
  if (!element) return;
  
  const { start = 'top 80%', end = 'bottom 20%', scrub = false } = triggerOptions;
  
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  });
}

// Timeline helper
export function createTimeline(options?: gsap.TimelineVars) {
  return gsap.timeline(options);
}

// Shake animation for errors
export function shakeElement(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    keyframes: [
      { x: -10, duration: 0.05 },
      { x: 10, duration: 0.05 },
      { x: -10, duration: 0.05 },
      { x: 10, duration: 0.05 },
      { x: 0, duration: 0.1 },
    ],
  });
}

// Pulse animation
export function pulseElement(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    keyframes: [
      { scale: 1.05, duration: 0.2 },
      { scale: 1, duration: 0.2 },
    ],
  });
}

// Ripple effect
export function createRipple(event: React.MouseEvent<HTMLElement>) {
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
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;
    transform: scale(0);
  `;
  
  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);
  
  gsap.to(ripple, {
    scale: 4,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove(),
  });
}

// Success checkmark animation
export function animateSuccess(element: HTMLElement | null) {
  if (!element) return;
  return gsap.timeline()
    .to(element, { scale: 1.1, backgroundColor: '#10B981', duration: 0.2 })
    .to(element, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
}

// Gradient shimmer effect
export function shimmerEffect(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    backgroundPosition: '200% 0',
    duration: 1.5,
    repeat: -1,
    ease: 'none',
  });
}
