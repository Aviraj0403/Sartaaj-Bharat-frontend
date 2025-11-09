import React from "react";
import BannerSlider from "./BannerSlider";
import CategorySlider from "./CategorySlider";
import BestsellerSection from "./BestsellerSection";

function Home() {
  return (
    <div>
      <BannerSlider />
      <CategorySlider />
      <BestsellerSection />
      {/* other homepage sections */}
    </div>
  );
}

export default Home;
