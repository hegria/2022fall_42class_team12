import HeroSection from "components/pages/home/sections/HeroSection";
import PopularProjectsSection from "components/pages/home/sections/PopularProjectsSection";
import RandomProjectsSection from "components/pages/home/sections/RandomProjectsSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <RandomProjectsSection />
      <PopularProjectsSection />
    </>
  );
}

export default HomePage;
