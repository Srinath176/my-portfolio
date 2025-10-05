import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { experiences } from "../utils/experienceData";

function Experience() {
  return (
    <section
      id="experience"
      className="min-h-[70vh] flex items-center justify-center px-4"
    >
      <div className="max-w-7xl w-full">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
          style={{ color: "var(--color-accent)" }}
        >
          Experience
        </motion.h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-[var(--color-card-border)]">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-8 ml-6"
            >
              {/* Icon */}
              <span
                className={`absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-[var(--color-card-bg)]`}
                style={{
                  backgroundColor:
                    exp.type === "education"
                      ? "var(--color-accent-hover)"
                      : "var(--color-accent)",
                }}
              >
                {exp.type === "education" ? (
                  <FaGraduationCap className="text-[var(--color-button-text)] text-sm" />
                ) : (
                  <FaBriefcase className="text-[var(--color-button-text)] text-sm" />
                )}
              </span>

              {/* Card with category-based glow */}
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow:
                    exp.type === "education"
                      ? "0 8px 20px rgba(3,105,161,0.4)" // color-accent-hover glow
                      : "0 8px 20px rgba(14,165,233,0.4)", // color-accent glow
                }}
                transition={{ duration: 0.3 }}
                className={`card p-5 transition-all duration-300 ${
                  exp.type === "education"
                    ? "border-l-4 border-[var(--color-accent-hover)]"
                    : ""
                }`}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {exp.role}
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {exp.company} • {exp.period}
                </p>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {exp.description}
                </p>

                {/* Certificate Link */}
                {exp.certificateUrl && (
                  <motion.a
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-3 py-1 text-sm rounded-md"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-button-text)",
                    }}
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    View Certificate
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
