import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X, UserPlusIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext"; 
import { LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, role, logout } = useAuth(); 

  const authed = !!token;
  const showLogin = !authed;
  const showRegister = !authed;
  const showServices = authed;
  const showOurTeam = authed;
  const showAppointments = authed;

  const showAdmin = authed && role === "ADMIN";

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src="/logo.svg" alt="Fresh Cuts Logo" className="h-10" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {showServices && (
            <Link to="/services" className="text-gray-800 hover:text-blue-500 font-medium">
              Services
            </Link>
          )}
          {showOurTeam && (
            <Link to="/team" className="text-gray-800 hover:text-blue-500 font-medium">
              Our Team
            </Link>
          )}
          {showAppointments && (
            <Link to="/appointments" className="text-gray-800 hover:text-blue-500 font-medium">
              Appointments
            </Link>
          )}
          {showAdmin && (
            <Link to="/admin" className="text-gray-800 hover:text-blue-500 font-medium">
              Admin Panel
            </Link>
          )}

          {showRegister && (
            <Link
              to="/register"
              className="text-gray-800 hover:text-blue-500 font-medium flex items-center gap-1"
            >
              <UserPlusIcon size={18} />
              Register
            </Link>
          )}
          {showLogin && (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
            >
              Login
            </Link>
          )}
           {authed && (
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          )}
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
            {showServices && (
              <Link to="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
            )}
            {showOurTeam && (
              <Link to="/team" onClick={() => setIsMenuOpen(false)}>
                Our Team
              </Link>
            )}
            {showAppointments && (
              <Link to="/appointments" onClick={() => setIsMenuOpen(false)}>
                Appointments
              </Link>
            )}
            {showAdmin && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                Admin Panel
              </Link>
            )}
            {showRegister && (
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            )}
            {showLogin && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
             {authed && (
              <button onClick={logout} className="text-left text-red-500">
                <LogOut/>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
    </>
    
  );
};

export default Header;
