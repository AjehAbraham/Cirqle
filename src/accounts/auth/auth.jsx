import api from "../../api/axios";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

export default function authRedirect(){
    const location = useLocation();
    const navigate = useNavigate();
   
  useEffect( () => {
 const checkSeasion = async () => {
 const raw = localStorage.getItem("user");
 
  if(raw){
     try {
        const user = JSON.parse(raw);
        const { data } = await api.post("/session/verfiy", user);
        if(data.success) {
          const from = location.state?.from || "/accounts/message/chats";
          navigate(from, { replace: true });
        }
      } catch (error) {
        localStorage.removeItem("user");
      } 
  } 
}
     checkSeasion();

  }, [navigate, location.state]);

}