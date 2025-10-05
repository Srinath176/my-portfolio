import Header from "./components/Header";
import { lazy, Suspense } from "react";
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
    <Suspense fallback={<SectionLoader />}>
      <div className="min-h-screen overflow-hidden">
        <Suspense fallback={null}>
          {" "}
          {/* Fallback for blob background can be null */}
          <AnimatedBlobBackground />
        </Suspense>

        <Header />

        <div id="home">
          <Profile />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="experience">
          <Experience />
        </div>

        <div id="contact">
          <GetInTouch />
        </div>

        {/* highlight-end */}
      </div>
    </Suspense>
  );
}

export default App;
