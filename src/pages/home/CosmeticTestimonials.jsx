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
        <div className="text-center mb-16">
          <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">User Validation</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 italic uppercase tracking-tighter">
            VALIDATION <span className="text-blue-600">LOGS.</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm uppercase tracking-widest leading-relaxed italic">
            ELITE OPERATIVES FROM ACROSS THE SUB-CONTINENT VERIFY OUR ARTIFACT CALIBRATION AND NEURAL RESULTS.
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
              <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm p-8 text-left hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all"></div>
                {/* Profile */}
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-black text-slate-950 italic uppercase tracking-tighter">{testimonial.name}</h4>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">{testimonial.role}</p>
                  </div>
                </div>

                {/* Feedback */}
                <p className="text-slate-500 font-medium text-sm leading-relaxed italic">
                  "{testimonial.feedback}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls */}
        <div className="flex justify-end items-center mt-6 space-x-4">
          <div className="custom-pagination flex space-x-2"></div>

          <div className="flex space-x-4">
            <button className="custom-prev px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all font-black text-xs italic">BACK</button>
            <button className="custom-next px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all font-black text-xs italic">NEXT</button>
          </div>
        </div>

      </div>
    </section>
  );
}
