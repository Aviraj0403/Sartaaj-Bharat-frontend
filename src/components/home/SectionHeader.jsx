import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="flex items-center justify-between mb-8 border-b-2 border-gray-100 pb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
                {title}
                <span className="absolute -bottom-[10px] left-0 w-1/2 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <a href="#" className="hidden md:block text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                View All Products &rarr;
            </a>
        </div>
    );
};

export default SectionHeader;
