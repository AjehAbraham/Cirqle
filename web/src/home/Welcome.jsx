import useTitle from "../components/UseTitle.jsx";
import {useNavigate} from "react-router-dom";
import "../css/App.css";
import app_logo from "../assets/app_logo.png";
import WelcomeScreen from "./WelcomeScreen2.jsx";

function Welcome(){
    useTitle("Cirqle-Home");
    const navigate = useNavigate();
    const navigator = () =>{
    navigate("/welcomeScreen");
    }
    return (
        <>
        <div className="home-container">
        <div className="image-container">
        <img src={app_logo} alt="app logo" />
        </div>
        <h1>Cirqle</h1>
        <h3>Simple.Private.Connected</h3>
        <button onClick={navigator}>Get Started </button>
    </div>
    </>
    );
}
export default Welcome;