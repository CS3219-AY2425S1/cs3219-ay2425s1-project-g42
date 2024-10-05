import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Logout() {
  const navigate = useNavigate();
  const {logout} = useAuth()

  useEffect(() => {
    logout()
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}

export default Logout;
