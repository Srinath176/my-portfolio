import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useMemo, memo } from "react";

// Blob configuration
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

// Minimal throttle utility
function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
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

  // Motion values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useTransform(mouseX, [0, screen.width], [-40, 40]);
  const offsetY = useTransform(mouseY, [0, screen.height], [-40, 40]);

  // Update screen size on resize
  useEffect(() => {
    const updateScreen = throttle(() => {
      setScreen({ width: window.innerWidth, height: window.innerHeight });
    }, 100);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }, 30);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Observe visibility of container
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Precompute blob directions only when screen size changes
  const directions = useMemo(
    () =>
      blobs.map((blob) => ({
        ...blob,
        ...getAnimationDirection(blob.from, screen, blob.size),
      })),
    [screen]
  );

  return (
    <div
      id="animated-bg"
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
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
          animate={{ ...blob.animate, rotate: [0, 360] }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
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
