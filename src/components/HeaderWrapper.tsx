import { useAuth } from "../context/AuthContext";
import AdminHeader from "./AdminHeader";
import CustomerHeader from "./CustomerHeader";

const HeaderWrapper = () => {
  const { role } = useAuth();

  if (role === "ADMIN") {
    return <AdminHeader />;
  }
  return <CustomerHeader />;
};

export default HeaderWrapper;
