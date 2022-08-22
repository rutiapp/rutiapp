import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faLongArrowRight} from '@fortawesome/free-solid-svg-icons'
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es obligatorio!
      </div>
    );
  }
};
const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <form className="login100-form validate-form">
          <span className="login100-form-title">
            Inicio de sesión
          </span>
          <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input className="input100" type="text" name="email" placeholder="Email" />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
          <div className="wrap-input100 validate-input" data-validate="Password is required">
            <input className="input100" type="password" name="pass" placeholder="Password" />
            <span className="focus-input100" />
            <span className="symbol-input100">
            <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">
              Login
            </button>
          </div>
          <div className="text-center p-t-12">
            <span className="txt1">
              ¿No tienes usuario?
            </span>
            <a className="txt1 m-l-5" href="#">
              Crea tu cuenta
              <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
              <FontAwesomeIcon icon={faLongArrowRight} />
            </a>
          </div>
          <div className="text-center p-t-136">
            
          </div>
        </form>
    
  );
};
export default Login;