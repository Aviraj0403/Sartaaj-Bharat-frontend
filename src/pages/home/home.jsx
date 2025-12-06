import React from "react";
import BannerSlider from "./BannerSlider";
import CategorySlider from "./CategorySlider";
import BestsellerSection from "./BestsellerSection";
import PromoSection from "./PromoSection";
import HomeNewArrivals from "../HomeNewArrivals";
import MobileCategorySection from "../category/MobileCategorySection";
import BeautyBanner from "./BeautyDiscountBanner";
import ComboSection from "./ComboSection";
import BeautyHighlightSection from "./BeautyHighlightSection";
import CosmeticTestimonials from "./CosmeticTestimonials";



function Home() {
  return (
    <div>
      <MobileCategorySection />
      <BannerSlider />
      <CategorySlider />
      <ComboSection  />
      <BestsellerSection />
      <PromoSection />
      <HomeNewArrivals />
      <BeautyBanner />
      <BeautyHighlightSection />
      <CosmeticTestimonials />
      {/* other homepage sections */}
    </div>
  );
}

export default Home;
