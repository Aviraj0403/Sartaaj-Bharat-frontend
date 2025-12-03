import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Smita mishra",
      role: "Cosmetic Product User",
      image: "https://i.ibb.co/4Ws7dby/girl1.jpg",
      feedback:
        "This cosmetic product has completely changed my skincare routine. The glow, hydration, and softness it gives my skin is amazing. I noticed visible results within just one week!",
    },
    {
      id: 2,
      name: "Sweety sharma",
      role: "Beauty Enthusiast",
      image: "https://i.ibb.co/5LM5ZJB/girl2.jpg",
      feedback:
        "I absolutely love this product! It feels premium, absorbs quickly, and gives a natural shine. My acne marks started fading and my skin tone improved within days.",
    },
    {
      id: 3,
      name: "Manshi Gupta",
      role: "Makeup Artist",
      image: "https://i.ibb.co/D5B8jSB/girl3.jpg",
      feedback:
        "As a makeup artist, I’ve tried many brands. But this product is truly impressive — lightweight, long-lasting, and perfect for daily use. Highly recommended for all skin types!",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What’s our students says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beauty lovers from across India trust our cosmetic products for their amazing results. 
            Our formulations are designed to enhance your natural glow, improve skin texture, 
            and give long-lasting nourishment.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Navigation]}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white border border-pink-300 rounded-lg shadow-md p-6 text-left">
                {/* Profile */}
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Feedback */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.feedback}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls */}
        <div className="flex justify-end items-center mt-6 space-x-4">
          <div className="custom-pagination flex space-x-2"></div>

          <div className="flex space-x-2">
            <button className="custom-prev px-3 py-1 bg-pink-200 rounded">←</button>
            <button className="custom-next px-3 py-1 bg-pink-200 rounded">→</button>
          </div>
        </div>

      </div>
    </section>
  );
}
