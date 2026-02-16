import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#232323] text-gray-400 pt-16 pb-8 mt-16">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

        {/* Column 1: Store Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-500 mt-1 flex-shrink-0" />
              <span>
                Sartaaj Bharat Store,<br />
                123 Tech Park, Cyber City,<br />
                Gurugram, Haryana, 122002
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-500 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500 flex-shrink-0" />
              <span>support@sartaajbharat.com</span>
            </li>
          </ul>

          <div className="flex gap-4 mt-6">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Products */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Products</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition">Prices drop</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">New products</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Best sales</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Contact us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Sitemap</a></li>
          </ul>
        </div>

        {/* Column 3: Our Company */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Our Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition">Delivery</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Legal Notice</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Terms and conditions of use</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">About us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Secure payment</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Newsletter</h3>
          <p className="text-sm mb-4">You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-gray-800 text-white px-4 py-2 outline-none text-sm border border-gray-700 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition">
              SUBSCRIBE
            </button>
          </form>
          <div className="mt-6 flex gap-2">
            <img src="https://prestashop.codezeel.com/PRS23/PRS230560/default/img/cms/payment.png" alt="Payments" className="opacity-80" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 Sartaaj Bharat Store. All Rights Reserved.</p>
          <p>Designed with <Heart size={12} className="inline text-red-500 fill-current" /> by Sartaaj Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
