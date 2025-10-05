import { DownloadCloud, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { lazy, memo, useMemo } from "react";

const RightContent = memo(({ darkMode }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
    className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
    style={{ willChange: "opacity, transform" }}
  >
    <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)]">
      Full Stack Developer | AI-Ready Web Solutions
    </h3>
    <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base">
      I’m a full-stack developer building scalable web applications with modern
      JavaScript frameworks, and actively exploring Generative AI integration. I
      create responsive solutions—ranging from e-commerce platforms to task
      management apps—developed through practical, production-level projects.
      Committed to continuous learning, I focus on writing high-quality,
      maintainable code and collaborating in innovative, team-driven
      environments.
    </p>
    <motion.div
      className="inline-flex items-center gap-2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link
        to="contact"
        smooth={true}
        duration={1000}
        offset={-70} // adjust if you have sticky headers
        className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-button)] text-[var(--color-button-text)] hover:bg-[var(--color-accent-hover)]
         font-semibold rounded-full shadow-md transition-colors duration-[0.3s] cursor-pointer"
      >
        <span>Resume</span>
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <DownloadCloud className="w-5 h-5" />
        </motion.div>
      </Link>
      <div className="relative group">
        <Info className="hidden md:block w-4 h-4 text-[var(--color-text)] cursor-pointer mt-1" />
        <div className="absolute -top-10 left-3/4 -translate-x-1/2 text-[var(--color-text)] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          Resume available — just drop me a message.
        </div>
      </div>
    </motion.div>
  </motion.div>
));

RightContent.displayName = "RightContent";

//main function
function Profile() {
  const gradientAnimation = useMemo(
    () => ({
      initial: { backgroundPosition: "200% center" },
      animate: { backgroundPosition: "-200% center" },
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 5,
      },
    }),
    []
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl min-h-[70vh] mx-auto card shadow-xl rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full lg:w-1/2 relative"
          style={{ willChange: "opacity, transform" }}
        >
          <motion.div
            className="w-52 h-52 sm:w-64 sm:h-64 overflow-hidden"
            animate={{
              borderRadius: [
                "40% 60% 70% 30% / 40% 50% 60% 50%",
                "70% 30% 50% 50% / 30% 30% 70% 70%",
                "100% 60% 60% 100% / 100% 100% 60% 60%",
                "40% 60% 70% 30% / 40% 50% 60% 50%",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "border-radius" }}
          >
            <img
              src="/profile.webp"
              alt="profile-pic"
              className="w-full h-full object-cover"
              loading="lazy"
              width="256" // Corresponds to sm:w-64
              height="256" // Corresponds to sm:h-64
            />
          </motion.div>
          <motion.h2
            {...gradientAnimation}
            className="mt-4 text-2xl sm:text-3xl font-bold text-center bg-gradient-to-l from-[#38bdf8] to-[#0284c7] bg-[length:200%_auto] bg-clip-text text-transparent tracking-wider"
          >
            Srinath Godisela
          </motion.h2>
          <motion.p
            className="mt-2 text-sm sm:text-base text-[var(--color-text-secondary)] italic text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Turning ideas into intelligent, scalable web experiences.
          </motion.p>
        </motion.div>
        <div className="hidden lg:block w-px h-64 bg-gray-300 opacity-15 mx-4" />
        <RightContent />
      </div>
    </section>
  );
}

export default Profile;
