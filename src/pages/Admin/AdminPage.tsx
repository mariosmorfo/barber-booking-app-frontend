import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { role } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <span className="text-sm text-gray-500">Role: {role}</span>
      </div>

      <nav className="mb-6 flex gap-3">
        <NavLink
          to="barbers"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg border ${isActive ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-200"}`
          }
        >
          Barbers
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg border ${isActive ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-200"}`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="appointments"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg border ${isActive ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-200"}`
          }
        >
          Appointments
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
