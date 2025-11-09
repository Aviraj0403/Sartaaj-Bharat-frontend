// Home.jsx
import React from 'react'

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center p-16 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store!</h1>
        <p className="text-lg mb-6">Find the best products at amazing prices.</p>
        <a 
          href="/shop" 
          className="bg-yellow-500 text-blue-900 py-2 px-6 rounded-full text-xl hover:bg-yellow-400 transition duration-300"
        >
          Start Shopping
        </a>
      </div>

      {/* Test Message Section */}
      <section className="mt-16 text-center">
        <p className="text-xl font-medium text-green-600">This is a test message to check text color with Tailwind!</p>
      </section>

      {/* Featured Products */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Product Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/200" alt="Product 1" className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Product 1</h3>
            <p className="text-gray-600 mb-4">A great product for your home.</p>
            <a href="/product/1" className="text-blue-600 hover:underline">View Details</a>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/200" alt="Product 2" className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Product 2</h3>
            <p className="text-gray-600 mb-4">Perfect for your kitchen.</p>
            <a href="/product/2" className="text-blue-600 hover:underline">View Details</a>
          </div>

          {/* Add more product cards as needed */}
        </div>
      </section>
    </div>
  )
}

export default Home;
