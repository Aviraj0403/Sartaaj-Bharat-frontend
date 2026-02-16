import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart, Check, Twitter, Facebook, Instagram, ChevronRight } from "lucide-react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { products } from "../../data/mockData";

const ProductDetails = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((p) => p.slug === slug);
        if (foundProduct) {
            setProduct(foundProduct);
            setActiveImage(foundProduct.image);
            if (foundProduct.colors && foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
            if (foundProduct.storage && foundProduct.storage.length > 0) setSelectedStorage(foundProduct.storage[0]);
        }
    }, [slug]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleQuantity = (type) => {
        if (type === "dec") {
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
        } else {
            setQuantity((prev) => prev + 1);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-gray-700">
            <Header />

            {/* Breadcrumb - Reference Style */}
            <div className="bg-[#F6F6F6] py-4 mb-8">
                <div className="container-custom flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <ChevronRight size={10} />
                    <Link to="#" className="capitalize hover:text-blue-600 transition">{product.category.replace('-', ' ')}</Link>
                    <ChevronRight size={10} />
                    <span className="text-gray-900">{product.name}</span>
                </div>
            </div>

            <div className="container-custom pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left: Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-4">
                        {/* Vertical Thumbnails */}
                        <div className="flex md:flex-col gap-3 overflow-auto md:w-20 md:h-[500px] scrollbar-hide">
                            <button
                                onClick={() => setActiveImage(product.image)}
                                className={`flex-shrink-0 w-20 h-20 border rounded-md cursor-pointer p-1 transition bg-white ${activeImage === product.image ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-400'}`}
                            >
                                <img src={product.image} className="w-full h-full object-contain" alt="thumbnail" />
                            </button>
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`flex-shrink-0 w-20 h-20 border rounded-md cursor-pointer p-1 transition bg-white ${activeImage === img ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-400'}`}
                                >
                                    <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image View */}
                        <div className="flex-1 border border-gray-100 rounded-xl p-8 relative group bg-white shadow-sm min-h-[500px] flex items-center justify-center">
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {product.isNew && (
                                    <span className="bg-gray-800 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded shadow-md tracking-wider">New</span>
                                )}
                                {product.oldPrice && (
                                    <span className="bg-red-500 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded shadow-md tracking-wider">
                                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                    </span>
                                )}
                            </div>

                            {/* Zoom/Expand Icon (Visual only) */}
                            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition text-gray-500 hover:text-blue-600">
                                <Share2 size={18} />
                            </button>

                            <img src={activeImage} className="max-w-full max-h-[450px] object-contain transition-transform duration-500 group-hover:scale-105" alt="Main Product" />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="pt-2">
                        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-4 uppercase tracking-tight leading-tight">{product.name}</h1>

                        <div className="flex items-center gap-6 mb-6 text-sm border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-1">
                                <div className="flex text-[#FFC107] text-xs">
                                    {'★'.repeat(Math.round(product.rating))}
                                    <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                                </div>
                                <span className="text-gray-400 font-medium ml-2">({product.reviews} Reviews)</span>
                            </div>

                            {product.brand && (
                                <div className="flex items-center gap-1 pl-6 border-l border-gray-200">
                                    <span className="text-gray-400">Brand:</span>
                                    <a href="#" className="font-bold text-gray-800 hover:text-blue-600">{product.brand}</a>
                                </div>
                            )}

                            <div className="flex items-center gap-1 pl-6 border-l border-gray-200">
                                <span className="text-gray-400">Reference:</span>
                                <span className="font-bold text-gray-800">{product.reference || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-extrabold text-blue-600">₹{product.price.toFixed(2)}</span>
                                {product.oldPrice && (
                                    <div className="flex flex-col items-start">
                                        <span className="text-gray-400 line-through text-lg font-medium">₹{product.oldPrice.toFixed(2)}</span>
                                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">Save ₹{(product.oldPrice - product.price).toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Tax included. Shipping calculated at checkout.</p>
                        </div>

                        <p className="text-gray-600 text-[15px] leading-7 mb-8">
                            {product.description}
                        </p>

                        {/* Attributes Section */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                            {/* Color */}
                            {product.colors && (
                                <div className="mb-5">
                                    <span className="font-bold text-gray-800 text-sm block mb-3">Color</span>
                                    <div className="flex gap-3">
                                        {product.colors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-9 h-9 rounded-full border-2 shadow-sm relative transition-all ${selectedColor?.name === color.name ? 'border-blue-600 ring-2 ring-blue-100 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            >
                                                {selectedColor?.name === color.name && (
                                                    <Check size={14} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${['#fff', '#ffffff', '#F0F2F2'].includes(color.hex) ? 'text-black' : 'text-white'}`} style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))' }} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Storage/Size */}
                            {product.storage && (
                                <div className="mb-5">
                                    <span className="font-bold text-gray-800 text-sm block mb-3">Internal Storage</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.storage.map((size, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedStorage(size)}
                                                className={`px-4 py-2 text-sm border rounded bg-white font-medium transition-all ${selectedStorage === size ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Block */}
                            <div className="flex items-end gap-4 mt-6 pt-6 border-t border-gray-200">
                                <div>
                                    <span className="font-bold text-gray-800 text-sm block mb-2">Quantity</span>
                                    <div className="flex items-center border border-gray-300 rounded bg-white">
                                        <button onClick={() => handleQuantity('dec')} className="p-3 hover:bg-gray-100 text-gray-500"><Minus size={14} /></button>
                                        <input type="text" value={quantity} readOnly className="w-12 text-center text-sm font-bold text-gray-800 focus:outline-none" />
                                        <button onClick={() => handleQuantity('inc')} className="p-3 hover:bg-gray-100 text-gray-500"><Plus size={14} /></button>
                                    </div>
                                </div>

                                <button className="flex-1 bg-gray-900 text-white hover:bg-blue-600 font-bold uppercase text-sm px-6 py-3.5 rounded shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 h-[46px]">
                                    <ShoppingCart size={18} /> Add to Cart
                                </button>

                                <button className="h-[46px] w-[46px] flex items-center justify-center border border-gray-300 rounded bg-white text-gray-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition shadow-sm" title="Add to Wishlist">
                                    <Heart size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Reassurance - Clean Horizontal */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {[
                                { icon: ShieldCheck, text: "Security Policy" },
                                { icon: Truck, text: "Delivery Policy" },
                                { icon: Share2, text: "Return Policy" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                                    <item.icon size={20} className="text-blue-600" />
                                    <span className="text-xs font-bold text-gray-700 uppercase">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Share - Minimal */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-400">Share</span>
                            <div className="flex gap-2">
                                {['Facebook', 'Twitter', 'Pinterest'].map((platform) => (
                                    <a key={platform} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white transition">
                                        {platform === 'Facebook' && <Facebook size={14} />}
                                        {platform === 'Twitter' && <Twitter size={14} />}
                                        {platform === 'Pinterest' && <Instagram size={14} />}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section - Inside Container */}
                <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-center gap-8 border-b border-gray-200">
                        {['description', 'product_details', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-2 uppercase text-sm font-bold tracking-wide relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                {tab.replace('_', ' ')}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 text-sm text-gray-600 leading-7">
                        {activeTab === 'description' && (
                            <div>
                                <p>{product.longDescription || product.description}</p>
                            </div>
                        )}
                        {activeTab === 'product_details' && (
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">Data sheet</h4>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {product.details ? Object.entries(product.details).map(([key, value]) => (
                                        <div key={key} className="flex border-b border-gray-100 pb-2">
                                            <dt className="font-bold text-gray-800 w-1/3">{key}</dt>
                                            <dd className="text-gray-600 w-2/3">{value}</dd>
                                        </div>
                                    )) : <p>No specific details available.</p>}
                                    {product.brand && (
                                        <div className="flex border-b border-gray-100 pb-2">
                                            <dt className="font-bold text-gray-800 w-1/3">Brand</dt>
                                            <dd className="text-gray-600 w-2/3">{product.brand}</dd>
                                        </div>
                                    )}
                                    {product.reference && (
                                        <div className="flex border-b border-gray-100 pb-2">
                                            <dt className="font-bold text-gray-800 w-1/3">Reference</dt>
                                            <dd className="text-gray-600 w-2/3">{product.reference}</dd>
                                        </div>
                                    )}
                                    <div className="flex border-b border-gray-100 pb-2">
                                        <dt className="font-bold text-gray-800 w-1/3">In stock</dt>
                                        <dd className="text-gray-600 w-2/3">160 Items</dd>
                                    </div>
                                </dl>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="text-center py-8">
                                <p>Grade</p>
                                <div className="flex justify-center text-yellow-500 my-2">{'★'.repeat(5)}</div>
                                <p className="font-bold text-lg text-gray-900">Awesome Product</p>
                                <p className="italic">"Best purchase I've made this year!" - John D.</p>
                                <button className="mt-4 bg-gray-800 text-white px-6 py-2 rounded uppercase text-xs hover:bg-gray-700">Write your review</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
