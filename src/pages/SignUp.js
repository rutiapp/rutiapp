import { useEffect } from "react";
import "../App.css";
import "../styles/utils.css";
import "../styles/home.css";
import {ReactComponent as RutiAppLogo} from '../assets/logo.svg';
import Register from "../components/Register";

const SignUp = () => {
  useEffect(() => {
  }, []);
  return (
    <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
      <span className="login100-form-title">
            ¡Bienvenid@ a RutiAPP! <p class="fs-20">Para comenzar registrate con el siguiente formulario.</p>
          </span>
        <div className="login100-pic js-tilt" data-tilt>
          <RutiAppLogo className="app-borders"/>
        </div>
        <Register/>
      </div>
    </div>
  </div>
  );
};
export default SignUp;