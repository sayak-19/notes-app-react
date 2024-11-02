import { useAppContext } from "../store/ContextApi";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminPage }) => {
  const { token, isAdmin } = useAppContext();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }
  if (token && adminPage && !isAdmin) {
    navigate("/access-denied");
  }

  return children;
};

export default ProtectedRoute;
