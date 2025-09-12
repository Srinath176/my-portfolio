import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useMemo, memo, useCallback } from "react";

// Reduced blob configuration for mobile performance
const blobs = [
  {
    id: 1,
    size: 200,
    duration: 10,
    delay: 0,
    from: "top-left",
    colors: ["#fbc2eb", "#a6c1ee"],
  },
  {
    id: 2,
    size: 160,
    duration: 20,
    delay: 2,
    from: "bottom-right",
    colors: ["#a1c4fd", "#c2e9fb"],
  },
  {
    id: 3,
    size: 130,
    duration: 8,
    delay: 3,
    from: "left-right",
    colors: ["#fddb92", "#d1fdff"],
  },
  {
    id: 4,
    size: 100,
    duration: 10,
    delay: 1,
    from: "right-left",
    colors: ["#ffecd2", "#fcb69f"],
  },
];

// Optimized throttle with proper cleanup
function createThrottle(func, limit) {
  let inThrottle = false;
  let timeoutId = null;
  
  const throttled = function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
        timeoutId = null;
      }, limit);
    }
  };
  
  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      inThrottle = false;
    }
  };
  
  return throttled;
}

const getAnimationDirection = (from, screen, size) => {
  switch (from) {
    case "top-left":
      return {
        initial: { x: -size, y: -size },
        animate: { x: screen.width + size, y: screen.height + size },
      };
    case "bottom-right":
      return {
        initial: { x: screen.width + size, y: screen.height + size },
        animate: { x: -size, y: -size },
      };
    case "left-right":
      return {
        initial: { x: -size, y: screen.height / 2 },
        animate: { x: screen.width + size, y: screen.height / 2 },
      };
    case "right-left":
      return {
        initial: { x: screen.width + size, y: screen.height / 2 },
        animate: { x: -size, y: screen.height / 2 },
      };
    default:
      return {
        initial: { x: -size, y: -size },
        animate: { x: screen.width + size, y: screen.height + size },
      };
  }
};

const AnimatedBlobBackground = memo(() => {
  const containerRef = useRef(null);
  const [screen, setScreen] = useState({ width: 1440, height: 1024 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const throttleRefs = useRef({});

  // Motion values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [0, screen.width], [-40, 40]);
  const offsetY = useTransform(mouseY, [0, screen.height], [-40, 40]);

  // Detect if user prefers reduced motion
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Optimize blob count based on device capabilities
  const optimizedBlobs = useMemo(() => {
    const isMobile = screen.width < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (prefersReducedMotion) return [];
    if (isMobile || isLowEnd) return blobs.slice(0, 2);
    return blobs;
  }, [screen.width, prefersReducedMotion]);

  // Memoized resize handler with proper cleanup
  const updateScreen = useCallback(() => {
    const newScreen = { width: window.innerWidth, height: window.innerHeight };
    setScreen(newScreen);
  }, []);

  // Memoized mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (!isPaused && isVisible) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
  }, [mouseX, mouseY, isPaused, isVisible]);

  // Update screen size on resize with proper cleanup
  useEffect(() => {
    const throttledResize = createThrottle(updateScreen, 100);
    throttleRefs.current.resize = throttledResize;
    
    updateScreen();
    window.addEventListener("resize", throttledResize);
    
    return () => {
      window.removeEventListener("resize", throttledResize);
      throttledResize.cancel();
    };
  }, [updateScreen]);

  // Track mouse position with proper cleanup
  useEffect(() => {
    const throttledMouseMove = createThrottle(handleMouseMove, 30);
    throttleRefs.current.mouseMove = throttledMouseMove;
    
    window.addEventListener("mousemove", throttledMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      throttledMouseMove.cancel();
    };
  }, [handleMouseMove]);

  // Observe visibility with performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        // Pause animations when not visible
        if (!visible) {
          setIsPaused(true);
        } else {
          // Small delay to prevent rapid toggling
          setTimeout(() => setIsPaused(false), 100);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: "50px"
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Pause animations when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Cleanup all throttled functions on unmount
  useEffect(() => {
    return () => {
      Object.values(throttleRefs.current).forEach(throttledFn => {
        if (throttledFn && throttledFn.cancel) {
          throttledFn.cancel();
        }
      });
    };
  }, []);

  // Precompute blob directions only when screen size changes
  const directions = useMemo(
    () =>
      optimizedBlobs.map((blob) => ({
        ...blob,
        ...getAnimationDirection(blob.from, screen, blob.size),
      })),
    [optimizedBlobs, screen]
  );

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      id="animated-bg"
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transition: "opacity 0.6s ease",
        willChange: "opacity"
      }}
    >
      {directions.map((blob) => (
        <motion.svg
          key={blob.id}
          width={blob.size}
          height={blob.size}
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute opacity-40"
          style={{
            translateX: offsetX,
            translateY: offsetY,
            willChange: "transform",
          }}
          initial={{ ...blob.initial, rotate: 0 }}
          animate={isPaused ? {} : { ...blob.animate, rotate: [0, 360] }}
          transition={{
            duration: blob.duration,
            repeat: isPaused ? 0 : Infinity,
            ease: "linear",
            delay: blob.delay,
          }}
        >
          <motion.path
            fill={`url(#gradient-${blob.id})`}
            d="M421.5,320.5Q412,391,346,426Q280,461,214.5,421.5Q149,382,126.5,311Q104,240,142,177Q180,114,248,91.5Q316,69,373.5,111Q431,153,429,211.5Q427,270,421.5,320.5Z"
          />
          <defs>
            <radialGradient
              id={`gradient-${blob.id}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor={blob.colors[0]} />
              <stop offset="100%" stopColor={blob.colors[1]} />
            </radialGradient>
          </defs>
        </motion.svg>
      ))}
    </div>
  );
});

AnimatedBlobBackground.displayName = "AnimatedBlobBackground";

export default AnimatedBlobBackground;