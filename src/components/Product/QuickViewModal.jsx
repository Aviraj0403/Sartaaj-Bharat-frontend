import React, { useState } from 'react';
import { X, Star, Check, ShoppingCart, Heart, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-slideUp max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 p-1 bg-white rounded-full hover:bg-gray-100 transition"
                >
                    <X size={24} />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply"
                    />
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase">{product.name}</h2>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold text-blue-600">₹{product.price.toFixed(2)}</div>
                        {product.oldPrice && (
                            <div className="text-gray-400 line-through text-lg">₹{product.oldPrice.toFixed(2)}</div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-500 text-xs">
                            {'★'.repeat(Math.round(product.rating))}
                            <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                        </div>
                        <span className="text-gray-500 text-sm">(2 Reviews)</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Check size={16} className="text-green-500" /> In Stock
                        </div>

                        {product.colors && (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-900">Color:</span>
                                <div className="flex gap-2">
                                    {product.colors.map((color, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-6 h-6 rounded-full border border-gray-300 ${selectedColor?.name === color.name ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-3 py-2 hover:bg-gray-100 text-gray-600"
                            >-</button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-12 text-center text-sm font-medium focus:outline-none"
                            />
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-3 py-2 hover:bg-gray-100 text-gray-600"
                            >+</button>
                        </div>

                        <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded font-bold text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2">
                            <ShoppingCart size={18} /> ADD TO CART
                        </button>
                    </div>

                    <div className="flex gap-6 mt-6 text-xs text-gray-500 font-medium">
                        <button className="flex items-center gap-2 hover:text-blue-600 transition"><Heart size={14} /> Add to Wishlist</button>
                        <button className="flex items-center gap-2 hover:text-blue-600 transition"><RefreshCw size={14} /> Add to Compare</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
