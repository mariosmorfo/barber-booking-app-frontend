import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import OurTeamPage from "./pages/OurTeamPage";
import AppointmentPage from "./pages/AppointmentPage"; // <- add this
import HeaderWrapper from "./components/HeaderWrapper";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { token, role, loading } = useAuth();
  if (loading) return null;
  return token && role === "ADMIN" ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderWrapper />
        <Routes>
          {/* public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* private (any logged-in user) */}
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <OurTeamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"                       // <- add this route
            element={
              <ProtectedRoute>
                <AppointmentPage/>
              </ProtectedRoute>
            }
          />

          {/* admin-only */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div>Admin Panel</div>
              </AdminRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
