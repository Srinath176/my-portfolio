import Header from "./components/Header";
import { lazy, Suspense } from "react";
import AnimatedSection from "./components/AnimatedSection";
import Profile from "./components/Profile";
import SectionLoader from "./components/SectionLoader";

const AnimatedBlobBackground = lazy(() =>
  import("./components/AnimatedBlobBg")
);
// highlight-start
// Lazy load all major sections
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const GetInTouch = lazy(() => import("./components/GetInTouch"));

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
