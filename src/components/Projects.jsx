import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo, memo, useCallback } from "react";
import { FaGithub } from "react-icons/fa6";
import { useDarkMode } from "../context/DarkModeContext";
import { BiX} from "react-icons/bi";

const allProjects = [
  {
    id: "weather-app",
    title: "Weather Forecast App",
    description:
      "Weather app with real-time updates using OpenWeatherMap API and timezone conversion.",
    github: "https://github.com/your-username/weather-app",
    objective:
      "Provide users with accurate and localized weather info using real-time data.",
    features: [
      "Live weather updates",
      "5-day forecast",
      "City timezone support",
    ],
    tech: ["React", "TailwindCSS", "OpenWeatherMap API"],
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone (MERN)",
    description:
      "YouTube clone with video upload, auth,channel creation, subscriptions, and search.",
    github: "https://github.com/your-username/youtube-clone",
    objective:
      "Recreate YouTube core functionality for learning full-stack concepts.",
    features: [
      "Video upload & streaming",
      "JWT Auth & protected routes",
      "Search, comments, likes",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express", "Redux"],
  },
  {
    id: "online-quiz",
    title: "Online Quiz",
    description:
      "Interactive online quiz in different categories, premium users for category-wise quiz.",
    github: "https://github.com/your-username/online-quiz",
    objective:
      "Users can test their knowledge in different categories by taking online quizzes.",
    features: [
      "Interactive Quiz",
      "Score Card",
      "Category-wise quiz",
      "Premium quiz",
    ],
    tech: ["React", "Java", "Spring-Boot", "Razorpay", "Framer-motion"],
  },
];

// Memoized Project Card to prevent unnecessary re-renders
const ProjectCard = memo(({ project, index, darkMode, onClick }) => (
  <motion.div
    className={`${
      darkMode ? "card" : "bg-indigo-50"
    } border border-zinc-200 rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 18,
      delay: index * 0.1,
    }}
    whileHover={{ scale: 1.02 }}
    onClick={() => onClick(project)}
  >
    <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
      {project.title}
    </h3>
    <p className="text-[var(--color-text-secondary)] mb-4">
      {project.description}
    </p>
    <div className="flex items-center gap-2 text-[var(--color-accent)]">
      <FaGithub className="w-4 h-4" />
      <span>View Code</span>
    </div>
  </motion.div>
));

ProjectCard.displayName = "ProjectCard";

// Memoized Modal Content to prevent re-renders
const ModalContent = memo(({ project, darkMode, onClose }) => (
  <motion.div
    className="card max-w-lg w-full mx-4 rounded-xl p-6 relative"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    onClick={(e) => e.stopPropagation()}
  >
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-[var(--color-text)] cursor-pointer"
    >
      <BiX className="w-5 h-5" />
    </button>
    <h3 className="text-2xl font-bold mb-2 text-[var(--color-text)]">
      {project.title}
    </h3>
    <p
      className={`${
        darkMode ? "text-gray-300" : "text-[var(--color-text-secondary)]"
      } mb-4`}
    >
      {project.objective}
    </p>
    <div className="mb-4">
      <h4
        className={`font-semibold ${
          darkMode ? "text-gray-100" : "text-[var(--color-text)]"
        } mb-1`}
      >
        🔧 Features:
      </h4>
      <ul
        className={`list-disc list-inside ${
          darkMode ? "text-gray-300" : "text-[var(--color-text-secondary)]"
        } space-y-1`}
      >
        {project.features.map((feat, i) => (
          <li key={i}>{feat}</li>
        ))}
      </ul>
    </div>
    <div className="mb-4">
      <h4
        className={`font-semibold ${
          darkMode ? "text-gray-100" : "text-[var(--color-text)]"
        } mb-1`}
      >
        🧪 Tech Stack:
      </h4>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className={`px-3 py-1 ${
              darkMode ? "card" : "bg-indigo-100"
            } text-[var(--color-accent)] rounded-full text-sm`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-4 text-[var(--color-accent)] hover:underline"
    >
      <FaGithub className="w-4 h-4" />
      View Code on GitHub
    </a>
  </motion.div>
));

ModalContent.displayName = "ModalContent";

//main function
function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeProject, setActiveProject] = useState(null);
  const { darkMode } = useDarkMode();

  // Memoize visible projects to prevent re-computation
  const visibleProjects = useMemo(
    () => allProjects.slice(0, visibleCount),
    [visibleCount]
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 3);
  }, []);

  const openModal = useCallback((project) => setActiveProject(project), []);
  const closeModal = useCallback(() => setActiveProject(null), []);

  return (
    <section className="w-screen px-4 py-16">
      <div className="card max-w-7xl min-h-[70vh] mx-auto relative z-0 rounded-2xl shadow-xl p-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-[var(--color-accent)]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              darkMode={darkMode}
              onClick={openModal}
            />
          ))}
        </div>

        {visibleCount < allProjects.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-[var(--color-button)] text-[var(--color-button-text)] rounded-full shadow hover:bg-[var(--color-accent-hover)] transition"
            >
              Load More
            </button>
          </div>
        )}

        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <ModalContent
                project={activeProject}
                darkMode={darkMode}
                onClose={closeModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


export default ProjectsSection;
