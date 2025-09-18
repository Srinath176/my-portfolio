import Header from "./components/Header";
// highlight-start
import { lazy, Suspense } from "react";
import AnimatedSection from "./components/AnimatedSection";
// highlight-end

const AnimatedBlobBackground = lazy(() =>
  import("./components/AnimatedBlobBg")
);
// highlight-start
// Lazy load all major sections
const Profile = lazy(() => import("./components/Profile"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const GetInTouch = lazy(() => import("./components/GetInTouch"));

// A simple fallback component to show while sections are loading
const SectionLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[var(--color-accent)]"></div>
  </div>
);
// highlight-end

function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Suspense fallback={null}>
        {" "}
        {/* Fallback for blob background can be null */}
        <AnimatedBlobBackground />
      </Suspense>
      <div id="home">
        <Header />
      </div>

      {/* highlight-start */}
      {/* Wrap each lazy-loaded component in Suspense */}

      <div id="profile">
        <Profile />
      </div>

      <Suspense fallback={<SectionLoader />}>
        <AnimatedSection id="skills">
          <Skills />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AnimatedSection id="projects">
          <Projects />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AnimatedSection id="experience">
          <Experience />
        </AnimatedSection>
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AnimatedSection id="contact">
          <GetInTouch />
        </AnimatedSection>
      </Suspense>
      {/* highlight-end */}
    </div>
  );
}

export default App;
