import React, { useEffect } from "react";
import "../App.css";
import "../styles/utils.css";
import "../styles/home.css";
import {ReactComponent as RutiAppLogo} from '../assets/logo.svg';
import Login from "../components/Login";

const Home = () => {
  useEffect(() => {
  }, []);
  return (
    <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-pic js-tilt" data-tilt>
          <RutiAppLogo className="app-borders"/>
        </div>
        <Login/>
      </div>
    </div>
  </div>
  );
};
export default Home;