import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPromoBanners } from "../../services/promoBannerApi";
import banner1 from "../../image/banner/bk1.png";

export default function PromoBanner() {
  const [promoBanners, setPromoBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoBanners = async () => {
      try {
        setLoading(true);
        const data = await getPromoBanners();
        
        // Extract banners array from response
        const banners = data?.promoBanners || data || [];
        
        // If no banners from backend, use default banner
        if (!banners || banners.length === 0) {
          setPromoBanners([{
            _id: 'default-banner',
            bannerImage: banner1,
            title: 'Special Offers',
            description: 'Discover amazing deals on beauty products'
          }]);
        } else {
          // Use banners directly - API already returns only active banners with images
          setPromoBanners(banners);
        }
      } catch (error) {
        console.error('Error fetching promo banners:', error);
        // On error, show default banner
        setPromoBanners([{
          _id: 'default-banner',
          bannerImage: banner1,
          title: 'Special Offers',
          description: 'Discover amazing deals on beauty products'
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoBanners();
  }, []);

  useEffect(() => {
    if (promoBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % promoBanners.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [promoBanners.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? promoBanners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % promoBanners.length);
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading promo banners...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden m-0 p-0">
      {/* Image Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out m-0 p-0"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {promoBanners.map((banner, index) => (
          <div
            key={banner._id || index}
            className="w-full flex-shrink-0 bg-white flex justify-center items-start m-0 p-0 relative"
          >
            <img
              src={banner.bannerImage}
              alt={banner.title || `Promo Banner ${index + 1}`}
              className="w-full h-auto object-contain md:object-cover block m-0 p-0 align-top"
              loading="lazy"
            />
            
            {/* Overlay with banner details - Only show if there's content and not default banner */}
            {(banner.title || banner.description) && banner._id !== 'default-banner' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="text-white p-4 md:p-6 w-full">
                  {banner.title && (
                    <h3 className="text-xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                      {banner.title}
                    </h3>
                  )}
                  {banner.description && (
                    <p className="text-sm md:text-lg opacity-95 drop-shadow-md">
                      {banner.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons (hidden on mobile, visible on md+) */}
      {promoBanners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Previous banner"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Next banner"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2 z-10">
            {promoBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  i === current ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}