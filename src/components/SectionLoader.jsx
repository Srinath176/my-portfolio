// A simple fallback component to show while sections are loading
const SectionLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[var(--color-accent)]"></div>
  </div>
);

export default SectionLoader;
