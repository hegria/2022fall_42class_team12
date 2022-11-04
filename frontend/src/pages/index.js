import HeroSection from "components/pages/home/sections/HeroSection";
import PopularProjectsSection from "components/pages/home/sections/PopularProjectsSection";
import RandomProjectsSection from "components/pages/home/sections/RandomProjectsSection";
import RecentProjectsSection from "components/pages/home/sections/RecentProjectsSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <RandomProjectsSection />
      <PopularProjectsSection />
      <RecentProjectsSection />
    </>
  );
}

export default HomePage;
