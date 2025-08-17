import AnimatedBlobBackground from "./components/AnimatedBlobBg";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GetInTouch from "./components/GetInTouch";
import AnimatedSection from "./components/AnimatedSection";
import Experience from "./components/Experience";

function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBlobBackground />

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
