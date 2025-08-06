import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, X, UserPlusIcon } from 'lucide-react'

 const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Fresh Cuts Logo"
              className="h-10"
            />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/services"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Services
          </Link>
          <Link
            to="/team"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Our Team
          </Link>
          <Link
            to="/gallery"
            className="text-gray-800 hover:text-blue-500 font-medium"
          >
            Gallery
          </Link>
          <Link
            to="/register"
            className="text-gray-800 hover:text-blue-500 font-medium flex items-center gap-1"
          >
            <UserPlusIcon size={18} />
            Register
          </Link>
          <Link
            to="/booking"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
          >
            Book Now
          </Link>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/services"
              className="text-gray-800 hover:text-blue-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/team"
              className="text-gray-800 hover:text-blue-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
            </Link>
            <Link
              to="/gallery"
              className="text-gray-800 hover:text-blue-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-blue-500 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/register"
              className="text-gray-800 hover:text-blue-500 font-medium py-2 flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserPlusIcon size={18} />
              Register
            </Link>
            <Link
              to="/booking"
              className="bg-blue-500 text-white px-6 py-2 rounded text-center hover:bg-blue-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header;
