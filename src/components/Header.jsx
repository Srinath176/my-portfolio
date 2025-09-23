import {
  ArrowDown,
  BriefcaseBusiness,
  FolderCodeIcon,
  GraduationCap,
  Grip,
  Home,
  UserRound,
  X,
} from "lucide-react";
import { useState, useMemo, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";
import { Link } from "react-scroll";
import useMediaQuery from "../utils/useMediaQuery";
import SectionLoader from "./SectionLoader";

const DarkModeToggle = lazy(() => import("./DarkModeToggle"));
const ToolTip = lazy(() => import("./ToolTip"));

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { darkMode } = useDarkMode();

  const menuItems = useMemo(
    () => [
      { name: "Home", icon: <Home />, path: "home", offset: 0 },
      { name: "Profile", icon: <UserRound />, path: "profile", offset: -70 },
      { name: "Skills", icon: <FolderCodeIcon />, path: "skills", offset: -70 },
      {
        name: "Projects",
        icon: <BriefcaseBusiness />,
        path: "projects",
        offset: -70,
      },
      {
        name: "Experience",
        icon: <GraduationCap />,
        path: "experience",
        offset: -70,
      },
    ],
    []
  );

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      pointerEvents: "none",
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      pointerEvents: "none",
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <header className="w-full flex justify-center z-50">
      <div className="h-24 md:h-0">
        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex fixed top-4 left-1/2 -translate-x-1/2 card shadow-lg px-6 py-3 rounded-full items-center justify-between w-[95%] sm:w-[90%] lg:w-[70%] max-w-6xl z-50"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="font-extrabold text-xl pr-4 bg-gradient-to-l from-[#38bdf8] to-[#0284c7] bg-[length:200%_auto] bg-clip-text text-transparent">
            SG.dev
          </div>
          <ul className="flex items-center justify-center gap-6 font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Suspense fallback={<SectionLoader />}>
                  <ToolTip label={item.name}>
                    <Link
                      to={item.path}
                      smooth={true}
                      duration={1000}
                      offset={item.offset}
                      spy={true}
                      activeClass="active-link"
                      className="flex items-center gap-2 px-2 py-1 transition-colors cursor-pointer text-[var(--color-text-secondary)]"
                    >
                      {item.icon}
                    </Link>
                  </ToolTip>
                </Suspense>
              </li>
            ))}
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={1000}
                offset={-70}
                className="px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg cursor-pointer transition-colors duration-[0.3s] bg-[var(--color-accent)] text-[var(--color-button-text)] hover:bg-[var(--color-accent-hover)]"
              >
                Join Me
                <motion.div
                  animate={{ y: [0, -4, 0], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowDown size={16} />
                </motion.div>
              </Link>
            </li>
          </ul>
          <div className="pl-4 cursor-pointer">
            <Suspense
              fallback={
                <SectionLoader />
              }
            >
              <ToolTip label={darkMode ? "Light" : "Dark"}>
                <DarkModeToggle />
              </ToolTip>
            </Suspense>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Nav */}
      {isMobile && (
        <div className="fixed top-4 left-4 right-4 flex items-center justify-between card text-[var(--color-text)] px-4 py-3 rounded-full shadow-md z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 bg-[var(--color-button)] text-[var(--color-button-text)] rounded-full"
          >
            {isMenuOpen ? <X size={22} /> : <Grip size={22} />}
          </button>
          <div className="flex items-center gap-3">
            <Suspense fallback={<SectionLoader/>}>
              <DarkModeToggle />
            </Suspense>
            <Link
              to="contact"
              smooth={true}
              duration={1000}
              offset={-70}
              className="bg-[var(--color-button)] text-[var(--color-button-text)] px-3 py-2 rounded-full flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              Join Me
              <motion.div
                animate={{ y: [0, -4, 0], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown size={16} />
              </motion.div>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-[80px] left-4 right-4 card text-[var(--color-text)] shadow-lg rounded-xl py-4 px-6 z-40 flex flex-col items-start gap-4"
          >
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                className="w-full"
              >
                <Link
                  to={item.path}
                  smooth={true}
                  duration={1000}
                  offset={item.offset}
                  spy={true}
                  activeClass="active-link"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left text-base font-medium px-2 py-2 rounded-md transition-all hover:scale-110 text-[var(--color-text-secondary)]"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
