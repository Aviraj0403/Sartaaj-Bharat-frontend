// src/pages/AboutUs.jsx
import React from "react";
import { FaHeart, FaLeaf, FaGift, FaBullseye, FaUsers, FaStar, FaShoppingBag } from "react-icons/fa";
import img from "../../image/about (1).png";

export default function AboutUs() {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-pink-100">
        <img
          src="https://images.unsplash.com/photo-1611855489988-51a0e9f5ec8c?auto=format&fit=crop&w=1600&q=80"
          alt="Hero"
          className="w-full h-96 object-cover brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            About Gurmeet Kaur Store
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Celebrating beauty, elegance, and style. Handpicked products to inspire confidence and make every day special.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center py-16 px-4 md:px-16">
        <div>
          <h2 className="text-4xl font-semibold text-pink-500 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            At Gurmeet Kaur Store, we believe that beauty is not just skin deep—it’s an experience that empowers and elevates you. Our premium cosmetic collection is thoughtfully curated to enhance your natural radiance with products that are as luxurious as they are effective. Whether you’re looking for skincare essentials, makeup that stays all day, or beauty tools that give you that professional touch, we’ve got you covered.
          </p>
          <p className="text-gray-700 mb-4">
           Every product we offer is carefully selected with the highest standards in mind, ensuring that only the best ingredients and formulations make their way to you. We are committed to sustainability, cruelty-free practices, and promoting self-care rituals that make you feel confident and beautiful from the inside out. Join us on this journey to beauty—because you deserve to shine, effortlessly.
          </p>
          <p className="text-gray-700">
           At Gurmeet Kaur Store, we believe that beauty is not just skin deep—it’s an experience that empowers and elevates you. Our premium cosmetic collection is thoughtfully curated to enhance your natural radiance with products that are as luxurious as they are effective. Whether you’re looking for skincare essentials, makeup that stays all day, or beauty tools that give you that professional touch, we’ve got you covered.
          </p>
        </div>
        <img
          src={img}
          alt="Our Journey"
          className="w-full rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Milestones / Stats */}
      <div className="bg-pink-50 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-8">Our Achievements</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaHeart className="text-pink-500 text-4xl mb-2 mx-auto" />
            <h3 className="text-3xl font-bold mb-2">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaShoppingBag className="text-yellow-500 text-4xl mb-2 mx-auto" />
            <h3 className="text-3xl font-bold mb-2">500+</h3>
            <p className="text-gray-600">Products Curated</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaStar className="text-green-500 text-4xl mb-2 mx-auto" />
            <h3 className="text-3xl font-bold mb-2">5K+</h3>
            <p className="text-gray-600">Positive Reviews</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaGift className="text-purple-500 text-4xl mb-2 mx-auto" />
            <h3 className="text-3xl font-bold mb-2">50+</h3>
            <p className="text-gray-600">Awards & Recognitions</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 py-16 px-4 md:px-16">
        <div className="bg-gradient-to-tr from-pink-100 to-pink-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
          <FaBullseye className="text-pink-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-3xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-700">
            Provide handpicked, high-quality beauty and lifestyle products that empower individuals and inspire confidence.
          </p>
        </div>
        <div className="bg-gradient-to-tr from-yellow-100 to-yellow-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
          <FaUsers className="text-yellow-500 text-5xl mb-4 mx-auto" />
          <h3 className="text-3xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-700">
            To be the most trusted lifestyle store in India, known for quality, authenticity, and customer-first experience.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="text-center py-16 px-4 md:px-16 bg-pink-50">
        <h2 className="text-4xl font-bold text-pink-500 mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition text-center">
            <FaHeart className="text-pink-500 text-5xl mb-4 mx-auto" />
            <h3 className="font-bold text-2xl mb-2">Customer Love</h3>
            <p className="text-gray-600">
              Personalized care and amazing shopping experience for every customer.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition text-center">
            <FaLeaf className="text-green-500 text-5xl mb-4 mx-auto" />
            <h3 className="font-bold text-2xl mb-2">Quality Products</h3>
            <p className="text-gray-600">
              Only the best makes it to our store. Quality and authenticity guaranteed.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition text-center">
            <FaGift className="text-yellow-500 text-5xl mb-4 mx-auto" />
            <h3 className="font-bold text-2xl mb-2">Thoughtful Selection</h3>
            <p className="text-gray-600">
              Every product curated to bring joy, beauty, and elegance into your life.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 md:px-16">
        <h2 className="text-4xl font-bold text-pink-500 mb-12 text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">
              "Absolutely love the curated products! The quality and service are exceptional."
            </p>
            <h4 className="font-semibold text-pink-500">– Anjali Sharma</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">
              "Fast delivery and excellent customer support. Highly recommend Gurmeet Kaur Store!"
            </p>
            <h4 className="font-semibold text-pink-500">– Priya Singh</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <p className="text-gray-700 mb-4">
              "The selection is amazing! Every product feels thoughtfully chosen."
            </p>
            <h4 className="font-semibold text-pink-500">– Ritu Verma</h4>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 bg-pink-100">
        <h2 className="text-4xl font-bold text-pink-500 mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Be the first to know about new arrivals, exclusive deals, and beauty tips. Don’t miss out on making your everyday moments special.
        </p>
        <button className="bg-pink-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-pink-600 transition text-lg">
          Subscribe Now
        </button>
      </div>
    </section>
  );
}
