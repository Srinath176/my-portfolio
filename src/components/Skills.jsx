import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiSpringboot,
  SiMongodb,
  SiPostman,
  SiVercel,
  SiGit,
  SiMysql,
  SiIntellijidea,
  SiPython,
  SiTypescript,
  SiOpenai,
  SiDocker,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";

const skillData = {
  Frontend: [
    { name: "HTML", icon: FaHtml5, color: "#e34c26" },
    { name: "CSS", icon: FaCss3Alt, color: "#264de4" },
    { name: "JavaScript", icon: FaJs, color: "#f0db4f", textColor: "black" },
    { name: "React", icon: FaReact, color: "#61DBFB" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38bdf8" },
    { name: "Redux", icon: SiRedux, color: "#764abc" },
  ],
  Backend: [
    { name: "Node.js", icon: FaNodeJs, color: "#68a063" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
    { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
    { name: "Java", icon: FaJava, color: "#f89820" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    { name: "MySQL", icon: SiMysql, color: "#00758F" },
  ],
  Tools: [
    { name: "Git", icon: SiGit, color: "#f1502f" },
    { name: "GitHub", icon: FaGithub, color: "#181717" },
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Vercel", icon: SiVercel, color: "#000000" },
    { name: "VSCode", icon: TbBrandVscode, color: "#007ACC" },
    { name: "IntelliJ", icon: SiIntellijidea, color: "#000000" },
  ],
  Future: [
    { name: "Python", icon: SiPython, color: "#3572A5" },
    { name: "Gen AI", icon: SiOpenai, color: "#4a5568" },
    { name: "Docker", icon: SiDocker, color: "#1D63ED" },
  ],
};

const categories = Object.keys(skillData);

const SkillCard = memo(({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.2 }}
    whileHover={{ scale: 1.05 }}
    className="w-32 h-32 flex flex-col justify-center items-center gap-3 px-4 py-3 card rounded-full shadow-sm"
    style={{ willChange: "opacity, transform" }}
  >
    <motion.div
      whileHover={{ rotate: [0, 15, -10, 0], transition: { duration: 0.6 } }}
      className="w-10 h-10 flex items-center justify-center rounded-full"
      style={{ backgroundColor: skill.color }}
    >
      <skill.icon
        className="text-white text-lg"
        style={{ color: skill.textColor || "#fff" }}
      />
    </motion.div>
    <span className="font-semibold text-[var(--color-text)]">{skill.name}</span>
  </motion.div>
));

SkillCard.displayName = "SkillCard";

function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");

  const activeSkills = useMemo(() => skillData[activeTab], [activeTab]);

  return (
    <section className="w-screen px-4 py-16">
      <div className="max-w-7xl min-h-[70vh] mx-auto card rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center gap-2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-[var(--color-accent)] mb-8"
        >
          Skills
        </motion.h2>
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <div className="relative inline-flex items-center gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <div key={cat} className="relative group">
                {activeTab === cat && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-[var(--color-accent-hover)] rounded-full shadow"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <button
                  onClick={() => setActiveTab(cat)}
                  className={`relative z-10 px-4 py-2 rounded-full font-medium transition-colors cursor-pointer
                    ${
                      activeTab === cat
                        ? "text-[var(--color-button-text)]"
                        : "text-[var(--color-text-secondary)] bg-gray-200"
                    }
                    ${
                      cat === "Future"
                        ? "border border-dashed border-gray-400"
                        : ""
                    }`}
                >
                  {cat}
                </button>
                {cat === "Future" && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-xs text-[var(--color-text)] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Upcoming Skills
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="min-h-[200px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto"
            >
              {activeSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Skills;
