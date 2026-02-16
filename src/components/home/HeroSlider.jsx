import React, { useState, useEffect } from 'react';
import { sliders } from '../../data/mockData';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 overflow-hidden group">
            {sliders.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-black/10"></div>

                    {/* Content */}
                    <div className="container-custom h-full flex flex-col justify-center relative z-20">
                        <div className="max-w-xl animate-fadeIn space-y-4 p-6 md:p-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">{slide.subtitle}</span>
                            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                                {slide.title}
                            </h2>
                            <p className="text-gray-700 text-lg md:text-xl">
                                {slide.description}
                            </p>
                            <div className="pt-4">
                                <button className="btn-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                                    {slide.btnText} <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 hover:bg-white shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 hover:bg-white shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-400 hover:bg-gray-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
