import React from "react";
import BannerSlider from "./BannerSlider";
import CategorySlider from "./CategorySlider";
import BestsellerSection from "./BestsellerSection";
import PromoSection from "./PromoSection";

function Home() {
  return (
    <div>
      <BannerSlider />
      <CategorySlider />
      <BestsellerSection />
      <PromoSection />
      {/* other homepage sections */}
    </div>
  );
}

export default Home;
