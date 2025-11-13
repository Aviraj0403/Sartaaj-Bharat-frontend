import React from "react";
import BannerSlider from "./BannerSlider";
import CategorySlider from "./CategorySlider";
import BestsellerSection from "./BestsellerSection";
import PromoSection from "./PromoSection";
import HomeNewArrivals from "../HomeNewArrivals";
import MobileCategorySection from "./MobileCategorySection";
import BeautyBanner from "./BeautyDiscountBanner";



function Home() {
  return (
    <div>
      <MobileCategorySection />
      <BannerSlider />
      <CategorySlider />
      <BestsellerSection />
      <PromoSection />
      <HomeNewArrivals />
      <BeautyBanner />
      {/* other homepage sections */}
    </div>
  );
}

export default Home;
