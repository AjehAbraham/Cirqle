import useTitle from "../components/UseTitle.jsx";
import info_friends_animation from "../assets/info_friends_animation.PNG";
import "../css/welcomeScreen.css";
import WelcomeScreen3 from "./WelcomeScreen3.jsx";
import { useNavigate } from "react-router-dom";

function WelcomeScreen(){
    useTitle("Cirqle-Welcome");
    const navigate = useNavigate();
    const navigator = () => {
        navigate("/welcomeScreen3");
    }
    return(
        <>
        <div className="main-container-home">
            <img src={info_friends_animation} alt="call animation" />
            <h1>Chat with Family<br /> & Friends</h1>
            <p>Send text, share photos,videos, <br /> document and your location, one-to <br /> or groups - Stay connected to people who matters.</p>
            <div className="span-container">
                <div className="pagination"></div> <div className="pagination" style={{backgroundColor: "#00F5D4"}}></div> <div className="pagination"></div> 
                </div>
                <button onClick={navigator}>Next <span className="material-symbols-outlined">arrow_forward_ios</span></button>
            </div>
        </>
    );
}
export default WelcomeScreen;