import Header from "./components/Header";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GetInTouch from "./components/GetInTouch";
import AnimatedSection from "./components/AnimatedSection";
import Experience from "./components/Experience";
import { lazy, Suspense } from "react";

const AnimatedBlobBackground = lazy(() => import("./components/AnimatedBlobBg"));

function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Suspense
        fallback={
          <div
            aria-hidden
            className="pointer-events-none h-40 md:h-56 lg:h-72"
          />
        }
      >
        <AnimatedBlobBackground />
      </Suspense>
      {/* Treat Header as the Home section */}
      <div id="home">
        <Header />
      </div>

      <AnimatedSection id="profile">
        <Profile />
      </AnimatedSection>

      <AnimatedSection id="skills">
        <Skills />
      </AnimatedSection>

      <AnimatedSection id="projects">
        <Projects />
      </AnimatedSection>

      <AnimatedSection id="experience">
        <Experience />
      </AnimatedSection>

      <AnimatedSection id="contact">
        <GetInTouch />
      </AnimatedSection>
    </div>
  );
}

export default App;
