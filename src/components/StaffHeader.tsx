import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function StaffHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role, logout } = useAuth();

  const isAdmin = role === "ADMIN";
  const isBarber = role === "BARBER";
  const panelLabel = isAdmin ? "Admin Panel" : "Barber Panel";
  const panelPath = isAdmin ? "/admin" : "/barber";

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src="/logo.svg" alt="Fresh Cuts Logo" className="h-10" />
        <nav className="hidden md:flex items-center space-x-8">
          {(isAdmin || isBarber) && (
            <Link to={panelPath} className="text-gray-800 hover:text-blue-500 font-medium">
              {panelLabel}
            </Link>
          )}

          <button onClick={logout} className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 cursor-pointer">
            <LogOut size={18} /> Logout
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
            {(isAdmin || isBarber) && (
              <Link to={panelPath} onClick={() => setIsMenuOpen(false)}>
                {panelLabel}
              </Link>
            )}
            <button onClick={logout} className="text-left text-red-500 flex items-center gap-2 cursor-pointer">
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
