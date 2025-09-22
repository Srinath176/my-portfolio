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

export const skillData = {
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

export const categories = Object.keys(skillData);
