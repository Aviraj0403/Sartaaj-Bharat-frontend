import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaRegHeart,
  FaUndo,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaCreditCard,
  FaGooglePay,
} from "react-icons/fa";
import { SiRazorpay, SiPhonepe } from "react-icons/si";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-50 to-white text-gray-700 pt-10 border-t border-pink-100">
      {/* Newsletter */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-pink-600 mb-2 flex justify-center items-center gap-2">
          <FaHeart className="text-pink-500" /> Join Our Beauty Club{" "}
          <FaHeart className="text-pink-500" />
        </h2>
        <p className="text-gray-600 mb-4">
          Subscribe to get special offers, beauty tips, and exclusive launches
        </p>
        <div className="flex justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-gray-200 py-10 px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-pink-600 mb-3">
            Beauty<span className="text-gray-800">Glow</span>
          </h3>
          <p className="text-gray-600 mb-4">
            Discover your natural beauty with our premium collection of
            cosmetics and skincare products.
          </p>
          <div className="flex gap-3">
            <a className="bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-pink-200">
              <FaInstagram />
            </a>
            <a className="bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-pink-200">
              <FaFacebookF />
            </a>
            <a className="bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-pink-200">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3 border-l-2 border-pink-500 pl-2">
            Shop
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Skincare</li>
            <li>Makeup</li>
            <li>Fragrance</li>
            <li>Gift Sets</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3 border-l-2 border-pink-500 pl-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Exchange</li>
            <li>Shipping Info</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h4 className="font-semibold text-lg text-gray-800 mb-3 border-l-2 border-pink-500 pl-2">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <MapPin className="text-pink-500 mt-1" size={18} />
              <span>123 Beauty Street, Cosmetic City, CC 12345</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-pink-500" size={18} /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-pink-500" size={18} /> hello@beautyglow.com
            </li>
          </ul>
        </div>
      </div>

      {/* Feature Icons */}
      <div className="border-t border-gray-200 py-8 px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700">
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
          <FaTruck className="text-pink-500 text-xl" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
          <FaShieldAlt className="text-pink-500 text-xl" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
          <FaRegHeart className="text-pink-500 text-xl" />
          <span>100% Authentic</span>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
          <FaUndo className="text-pink-500 text-xl" />
          <span>Easy Returns</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-5 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p>
          © 2024 BeautyGlow. All rights reserved. Made with{" "}
          <FaHeart className="inline text-pink-500" /> for beauty lovers
        </p>

        {/* ✅ Updated Payment Icons */}
        <div className="flex items-center gap-3 mt-3 md:mt-0 flex-wrap justify-center">
          <span className="text-gray-500">We Accept:</span>
          <FaCcVisa className="text-blue-600 text-2xl" />
          <FaCcMastercard className="text-red-500 text-2xl" />
          <FaCcPaypal className="text-blue-400 text-2xl" />
          <FaApplePay className="text-gray-800 text-2xl" />
          <SiRazorpay className="text-blue-500 text-2xl" />
          <FaCreditCard className="text-gray-700 text-2xl" />
          <SiPhonepe className="text-purple-500 text-2xl" />
          <FaGooglePay className="text-green-600 text-2xl" />
        </div>
      </div>
    </footer>
  );
}
