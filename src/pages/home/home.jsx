import React from "react";
import BannerSlider from "./BannerSlider";
import CategorySlider from "./CategorySlider";
import BestsellerSection from "./BestsellerSection";
import PromoBanner from "./PromoBanner";
import HomeNewArrivals from "../HomeNewArrivals";
import MobileCategorySection from "../category/MobileCategorySection";
import BeautyBanner from "./BeautyDiscountBanner";
import ComboSection from "./ComboSection";
import BeautyHighlightSection from "./BeautyHighlightSection";
import CosmeticTestimonials from "./CosmeticTestimonials";
import FloatingNewArrival from "./FloatingNewArrival";



function Home() {
  return (
    <div>
      <FloatingNewArrival />
      <MobileCategorySection />
      <BannerSlider />
      <CategorySlider />
      <ComboSection  />
      <BestsellerSection />
      <FloatingNewArrival/>
      <HomeNewArrivals />
      <PromoBanner />
      <BeautyBanner />
      <BeautyHighlightSection />
      <CosmeticTestimonials />
      {/* other homepage sections */}
    </div>
  );
}

export default Home;
