import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Protected route called");

    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return children;
}

export default ProtectedRoute;
