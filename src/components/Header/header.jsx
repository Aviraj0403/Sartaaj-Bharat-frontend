
import React from 'react'

function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">Store Logo</div>
        
        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/shop" className="hover:text-gray-300">Shop</a></li>
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>

        {/* Cart */}
        <div className="flex items-center space-x-4">
          <a href="/cart" className="relative">
            <i className="fas fa-shopping-cart text-2xl"></i>
            {/* Cart Count Badge */}
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header;
