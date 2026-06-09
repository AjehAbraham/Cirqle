
import useTitle from "../components/UseTitle.jsx";
import  info_call_animation from "../assets/info_call_animation.jpg";
import "../css/welcomeScreen.css";
import Terms from "./Terms_conditions.jsx";
import { useNavigate } from "react-router";


function WelcomeScreen3(){
    useTitle("Cirqle-Welcome");
    const navigate = useNavigate();
    const navigator = () => {
        navigate("/terms_conditions");
    }
    return(
        <>
        <div className="main-container">
            <img src={info_call_animation} alt="call animation" />
            <h1>Make Crystal-Clear</h1>
            <h1> Calls</h1>
            <p>Make HD voice and video calls with <br />
            individual or group, where ever <br />
            you are in the world!</p>
            <div className="span-container">
                <div className="pagination"></div> <div className="pagination"></div> <div className="pagination" style={{backgroundColor: "#00F5D4"}}></div> 
                </div>
                <button onClick={navigator}>Next <span className="material-symbols-outlined">arrow_forward_ios</span></button>
            </div>
        </>
    );
}
export default WelcomeScreen3;