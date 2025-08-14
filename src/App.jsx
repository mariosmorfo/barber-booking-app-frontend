import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import OurTeamPage from "./pages/OurTeamPage";
import AppointmentPage from "./pages/AppointmentPage"; // <- add this
import HeaderWrapper from "./components/HeaderWrapper";
import AdminPage from "./pages/Admin/AdminPage";
import BarbersAdminPage from "./pages/Admin/BarbersAdminPage";
import UsersAdminPage from "./pages/Admin/UserAdminPage";
// import AppointmentsAdminPage from "./pages/Admin/AppointmentAdminPage";

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
        
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

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
            path="/appointments"                       
            element={
              <ProtectedRoute>
                <AppointmentPage/>
              </ProtectedRoute>
            }
          />

          <Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}>
          <Route index element={<Navigate to="barbers" replace/>} />
          <Route path="barbers" element={<BarbersAdminPage/>} />
          <Route path="users" element={<UsersAdminPage/>} />
          {/* <Route path="appointments" element={<AppointmentsAdminPage/>} /> */}
        </Route>
         
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
