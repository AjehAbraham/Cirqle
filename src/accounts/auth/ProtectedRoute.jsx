import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const raw = localStorage.getItem("user");
      if (!raw) {
        navigate("/accounts/auth/login", {state: {from: location.pathname}, replace: true });
        return;
      }

      const user = JSON.parse(raw);
      if (!user?.phone) {
        localStorage.removeItem("user");
        navigate("/accounts/auth/login", {state: {from: location.pathname}, replace: true });
        return;
      }

      try {
        
        const { data } = await api.post("/session/verfiy", user);
        if (!data.success)  navigate("/accounts/auth/login", {state: {from: location.pathname}, replace: true });
        setIsAuth(true);
      } catch (error) {
        const backendError = error.response?.data?.error;
        const statusCode = backendError?.statusCode || backendError?.status;
        if(statusCode === 500 || statusCode === 403){
        localStorage.removeItem("user");
        navigate("/accounts/auth/login", { replace: true });
        }else{
          alert(error.response?.data?.error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div style={{ padding: 50, textAlign: 'center' }}>Loading...</div>;
  }

  return isAuth? children : null;
}