// src/pages/AboutUs.jsx
import React from "react";
import { FaHeart, FaLeaf, FaGift, FaBullseye, FaUsers, FaStar, FaShoppingBag } from "react-icons/fa";
import img from "../../image/about (1).png";

export default function AboutUs() {
  return (
    <section className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-pink-100">
        <img
          src="https://images.unsplash.com/photo-1611855489988-51a0e9f5ec8c?auto=format&fit=crop&w=1600&q=80"
          alt="Hero"
          className="w-full h-96 object-cover brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl italic uppercase tracking-tighter">
            THE ELITE <span className="text-blue-600">PROTOCOL.</span>
          </h1>
          <p className="text-sm md:text-base font-black uppercase tracking-[0.4em] max-w-3xl mx-auto drop-shadow-md opacity-80 italic">
            DEFINING THE QUANTUM STANDARD OF BEAUTY AND PRECISION.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center py-16 px-4 md:px-16">
        <div>
          <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block italic">Origin Narrative</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 mb-8 italic uppercase tracking-tighter">OUR <span className="text-blue-600">MISSION.</span></h2>
          <div className="space-y-6">
            <p className="text-slate-600 font-medium leading-relaxed">
              At SarTaaj Bharat, we believe that aesthetic excellence is not just a surface-level pursuit—it’s an engineered experience that empowers your core architecture. Our elite selection is rigorously benchmarked to enhance your natural radiance with artifacts that are as technically superior as they are visually stunning.
            </p>
            <p className="text-slate-600 font-medium leading-relaxed">
              Every asset in our vault is curated using the highest industry protocols, ensuring only the most refined formulations reach your interface. We are committed to absolute precision, cruelty-free innovation, and the evolution of self-care rituals.
            </p>
          </div>
        </div>
        <img
          src={img}
          alt="Our Journey"
          className="w-full rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Milestones / Stats */}
      <div className="bg-slate-900 py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
        <h2 className="text-2xl font-black text-white mb-16 italic uppercase tracking-[0.2em] opacity-40">System Benchmarks</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg p-10 rounded-[2rem] border border-white/5 hover:border-blue-600 transition-all group">
            <FaHeart className="text-blue-600 text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black mb-2 text-white italic">10K+</h3>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Active Nodes</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg p-10 rounded-[2rem] border border-white/5 hover:border-blue-600 transition-all group">
            <FaShoppingBag className="text-blue-600 text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black mb-2 text-white italic">500+</h3>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Verified Artifacts</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg p-10 rounded-[2rem] border border-white/5 hover:border-blue-600 transition-all group">
            <FaStar className="text-blue-600 text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black mb-2 text-white italic">5K+</h3>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Validated Feedback</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-lg p-10 rounded-[2rem] border border-white/5 hover:border-blue-600 transition-all group">
            <FaGift className="text-blue-600 text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black mb-2 text-white italic">50+</h3>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Neural Rewards</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 py-24 px-4 md:px-16">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 hover:border-blue-600 transition-all text-center group">
          <FaBullseye className="text-blue-600 text-5xl mb-8 mx-auto group-hover:rotate-12 transition-transform" />
          <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter text-slate-900">CORE <span className="text-blue-600">MISSION</span></h3>
          <p className="text-slate-500 font-medium">
            To provide handpicked, high-precision artifacts that empower the individual and define global standards of aesthetic excellence.
          </p>
        </div>
        <div className="bg-slate-900 p-12 rounded-[3rem] shadow-xl border border-slate-800 hover:border-blue-600 transition-all text-center group">
          <FaUsers className="text-blue-600 text-5xl mb-8 mx-auto group-hover:-rotate-12 transition-transform" />
          <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter text-white">THE <span className="text-blue-600">VISION</span></h3>
          <p className="text-slate-400 font-medium">
            To evolve as the architect of India's most trusted premium lounge, defined by authenticity and a customer-centric quantum experience.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="text-center py-24 px-4 md:px-16 bg-slate-50">
        <h2 className="text-2xl font-black text-slate-400 mb-16 italic uppercase tracking-[0.3em]">Elite Differentiators</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-sm p-12 hover:shadow-2xl transition-all text-center border border-slate-100 border-b-4 border-b-blue-600">
            <FaHeart className="text-blue-600 text-5xl mb-6 mx-auto" />
            <h3 className="font-black text-2xl mb-4 italic uppercase tracking-tighter">CLIENT DEVOTION</h3>
            <p className="text-slate-500 font-medium text-sm">
              Personalized concierge protocols and a seamless neural interface for every user.
            </p>
          </div>
          <div className="bg-white rounded-[2.5rem] shadow-sm p-12 hover:shadow-2xl transition-all text-center border border-slate-100 border-b-4 border-b-blue-600">
            <FaLeaf className="text-blue-600 text-5xl mb-6 mx-auto" />
            <h3 className="font-black text-2xl mb-4 italic uppercase tracking-tighter">PRIME QUALITY</h3>
            <p className="text-slate-500 font-medium text-sm">
              Only verified elite assets cross our perimeter. Guaranteed authenticity.
            </p>
          </div>
          <div className="bg-white rounded-[2.5rem] shadow-sm p-12 hover:shadow-2xl transition-all text-center border border-slate-100 border-b-4 border-b-blue-600">
            <FaGift className="text-blue-600 text-5xl mb-6 mx-auto" />
            <h3 className="font-black text-2xl mb-4 italic uppercase tracking-tighter">CURATED LOGIC</h3>
            <p className="text-slate-500 font-medium text-sm">
              Every artifact is algorithmically selected to bring sophistication and beauty.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 px-4 md:px-16">
        <h2 className="text-2xl font-black text-slate-400 mb-16 text-center italic uppercase tracking-[0.3em]">VALIDATION REVIEWS</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { name: "Anjali Sharma", feedback: "The curated artifacts are superior. The tech interface and service are beyond industry standards." },
            { name: "Priya Singh", feedback: "Fast encryption-to-delivery and excellent neural support. Highly recommend the SarTaaj Experience." },
            { name: "Ritu Verma", feedback: "The selection is elite. Every artifact feels mathematically optimized for elegance." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 relative group">
              <div className="absolute top-0 left-10 w-8 h-1 bg-blue-600"></div>
              <p className="text-slate-600 italic font-medium mb-8 leading-relaxed">
                "{item.feedback}"
              </p>
              <h4 className="font-black text-blue-600 uppercase tracking-widest text-xs italic">// {item.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-24 bg-slate-900 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic uppercase tracking-tighter">SYNC WITH THE <span className="text-blue-600">COMMUNITY.</span></h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto font-medium text-sm leading-relaxed uppercase tracking-wide">
          AUTHORIZE ACCESS TO THE LATEST NEURAL REWARDS, EXCLUSIVE ARTIFACT DEFAULTS, AND ELITE PROTOCOLS.
        </p>
        <button className="bg-blue-600 text-white font-black px-12 py-5 rounded-2xl hover:bg-white hover:text-slate-950 transition-all text-[10px] uppercase tracking-[0.4em] italic shadow-xl shadow-blue-500/10">
          Sync Now
        </button>
      </div>
    </section>
  );
}
