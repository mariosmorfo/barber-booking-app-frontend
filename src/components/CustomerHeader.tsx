import {useState} from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X, UserPlusIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from 'lucide-react';
const CustomerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useAuth();
  const authed = !!token;

  return (
    <>
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.svg" alt="Fresh Cuts Logo" className="h-10" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">

          {authed && (
            <>
              <Link to="/services" className="text-gray-800 hover:text-blue-500 font-medium">
                Services
              </Link>
              <Link to="/team" className="text-gray-800 hover:text-blue-500 font-medium">
                Our Team
              </Link>
              <Link to="/appointments" className="text-gray-800 hover:text-blue-500 font-medium">
                Appointments
              </Link>
              <button onClick={logout}  className="text-red-500 hover:text-red-600 font-medium cursor-pointer">
                <LogOut/>
              </button>
            </>
          )}

          {!authed && (
            <>
              <Link
                to="/register"
                className="text-gray-800 hover:text-blue-500 font-medium flex items-center gap-1"
              >
                <UserPlusIcon size={18} />
                Register
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
              >
                Login
              </Link>
            </>
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
            {authed ? (
              <>
                <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link to="/team" onClick={() => setIsMenuOpen(false)}>Our Team</Link>
                <Link to="/appointments" onClick={() => setIsMenuOpen(false)}>Appointments</Link>
                <button onClick={logout} className="text-left text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header></>
    
  );
};

export default CustomerHeader;
