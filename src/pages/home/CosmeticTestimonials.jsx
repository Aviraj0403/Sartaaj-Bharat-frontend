import React from "react";
import { motion } from "framer-motion";

export default function CosmeticTestimonials() {
  const reviews = [
    {
      name: "Sana Kapoor",
      role: "Beauty Influencer",
      review:
        "This cosmetic product completely transformed my skin! The texture feels luxurious and results are visible within days.",
      img: "https://i.ibb.co/4Ws7dby/girl1.jpg",
    },
    {
      name: "Aisha Sharma",
      role: "Makeup Artist",
      review:
        "The formula is lightweight yet super effective. Perfect for daily use and gives a natural radiant glow!",
      img: "https://i.ibb.co/Cv6Q0Fp/girl2.jpg",
    },
    {
      name: "Riya Mehta",
      role: "Fashion Model",
      review:
        "Absolutely in love! My skin feels hydrated, fresh, and beautifully smooth. Highly recommended!",
      img: "https://i.ibb.co/7YSWcQG/girl3.jpg",
    },
    {
      name: "Kritika Verma",
      role: "Skin Care Specialist",
      review:
        "A premium formula that nourishes the skin deeply. Perfect for achieving a natural glow.",
      img: "https://i.ibb.co/Cv6Q0Fp/girl2.jpg",
    },
    {
      name: "Niharika Jain",
      role: "Makeup Reviewer",
      review:
        "Super smooth, non-sticky and gives a flawless finish. I use it daily!",
      img: "https://i.ibb.co/4Ws7dby/girl1.jpg",
    },
  ];

  // Duplicate list for seamless infinite scroll
  const doubledReviews = [...reviews, ...reviews];

  return (
    <section className="py-10 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* Heading */}
      <h1 className="text-center text-5xl font-extrabold text-pink-600 mb-4 tracking-wide">
        What Our Customers Say
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
        Real experiences from customers who trust our cosmetic products for
        beauty, glow, and confidence.
      </p>

      {/* Slider Wrapper */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10"
          animate={{
            x: ["0%", "-100%"], // slide full width
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {doubledReviews.map((r, i) => (
            <div
              key={i}
              className="min-w-[90%] sm:min-w-[45%] md:min-w-[30%] bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-pink-100"
            >
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow-md"
                />
              </div>

              {/* Review */}
              <p className="text-gray-700 text-center italic leading-relaxed mb-4">
                “{r.review}”
              </p>

              {/* Name */}
              <h2 className="text-center text-xl font-bold text-pink-600">
                {r.name}
              </h2>
              <p className="text-center text-gray-500">{r.role}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
