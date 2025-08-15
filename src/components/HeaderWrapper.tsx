import { useAuth } from "../context/AuthContext";
import StaffHeader from "./StaffHeader";
import CustomerHeader from "./CustomerHeader";

export default function HeaderWrapper() {
  const { role } = useAuth();

  if (role === "ADMIN" || role === "BARBER") {
    return <StaffHeader/>;
  }
  return <CustomerHeader/>;
}
