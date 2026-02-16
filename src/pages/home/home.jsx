import React from 'react';
import Header from '../../components/Header/header.jsx';
import Footer from '../../components/Footer/footer.jsx';
import HeroSlider from '../../components/home/HeroSlider.jsx';
import ProductCard from '../../components/Product/ProductCard.jsx';
import SectionHeader from '../../components/home/SectionHeader.jsx';
import { products } from '../../data/mockData.js';
import { ArrowRight, Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

const Home = () => {
  // Filter products for different sections
  const newProducts = products.filter(p => p.isNew);
  const featuredProducts = products.filter(p => p.isFeatured);
  const bestsellers = products.filter(p => p.isBestseller);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mb-12">
          <HeroSlider />
        </section>

        {/* Features/Policy Section */}
        <section className="container-custom mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders over ₹999" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure payment" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated support" },
              { icon: CreditCard, title: "Money Back", desc: "If you're not satisfied" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 border border-gray-100 rounded-lg hover:shadow-md transition bg-gray-50/50">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Products */}
        <section className="container-custom mb-16">
          <SectionHeader title="Latest Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Banner Section */}
        <section className="container-custom mb-16">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 group">
            <img
              src="https://prestashop.codezeel.com/PRS23/PRS230560/default/img/cms/cms-banner-1.jpg"
              alt="Promo Banner"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center p-8 md:p-16">
              <div className="text-white max-w-lg space-y-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Limited Offer</span>
                <h3 className="text-3xl md:text-5xl font-bold">Smart Watch<br />Collection</h3>
                <button className="flex items-center gap-2 text-white font-medium hover:gap-4 transition-all">
                  Shop Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container-custom mb-16">
          <SectionHeader title="Featured Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Two Column Banners */}
        <section className="container-custom mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-xl overflow-hidden h-60 group">
              <img src="https://prestashop.codezeel.com/PRS23/PRS230560/default/modules/cz_imageslider/views/img/sample-1.jpg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">New Arrivals</h3>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-60 group">
              <img src="https://prestashop.codezeel.com/PRS23/PRS230560/default/modules/cz_imageslider/views/img/sample-2.jpg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Bestsellers</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="container-custom mb-16">
          <SectionHeader title="Special Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
