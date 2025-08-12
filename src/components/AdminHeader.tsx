import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.svg" alt="Fresh Cuts Logo" className="h-10" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/admin" className="text-gray-800 hover:text-blue-500 font-medium">
            Admin Panel
          </Link>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </nav>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              Admin Panel
            </Link>
            <button
              onClick={logout}
              className="text-left text-red-500"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
