import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext.jsx";

function DarkModeToggle() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <motion.button
            onClick={toggleDarkMode}
            whileTap={{scale:0.9}}
            className="p-1 lg:p-2 rounded-full transition-all duration-300 cursor-pointer border-none]
                 bg-[var(--color-accent)] 
                 text-[var(--color-button-text)]
                 hover:bg-[var(--color-accent-hover)]"
        >
            <div className="w-6 h-6 relative">
                <AnimatePresence mode="sync" initial={false}>
                    {darkMode ? (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20}}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Sun className="w-4 h-4" strokeWidth={2.5}/>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{type: "spring", stiffness: 100, damping: 20}}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Moon className="w-4 h-4" strokeWidth={2.5}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.button >
    );
}

export default DarkModeToggle;
