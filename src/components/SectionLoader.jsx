// src/components/SectionLoader.jsx
import { motion } from "framer-motion";

// This loader should ONLY be used for initial app loading, not for section lazy loading
const SectionLoader = () => (
   <motion.div
    className="fixed inset-0 flex items-center justify-center bg-[var(--color-bg)] z-50"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SG Logo Loader */}
      <motion.div
        className="text-6xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#0284c7] bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        SG
      </motion.div>

      {/* Loading dots */}
      <div className="flex justify-center gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[var(--color-accent)] rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default SectionLoader;
