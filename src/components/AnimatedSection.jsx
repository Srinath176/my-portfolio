import { motion } from "framer-motion";

export default function AnimatedSection({ children, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-screen flex items-center justify-center"
    >
      {children}
    </motion.section>
  );
}
