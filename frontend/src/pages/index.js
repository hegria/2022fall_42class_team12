import HeroSection from "../components/pages/home/sections/HeroSection";
import PopularSection from "../components/pages/home/sections/PopularSection";
import RandomSection from "../components/pages/home/sections/RandomSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <RandomSection />
      <PopularSection />
    </>
  );
}

export default HomePage;
