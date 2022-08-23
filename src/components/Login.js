import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faLongArrowRight} from '@fortawesome/free-solid-svg-icons'
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
  }
  return (
    <Form onSubmit={handleLogin} className="login100-form validate-form" ref={form}>
          <span className="login100-form-title">
            Inicio de sesión
          </span>
          <div className="wrap-input100 validate-input" >
             <Input
              type="text"
              className="input100"
              name="username"
              value={username}
              onChange={onChangeUsername}
              placeholder="Nombre de usuario"
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
          <div className="wrap-input100 validate-input" >
            <Input
              type="password"
              className="input100"
              name="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Contraseña"
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
            <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn" disabled={loading}>
              {loading && (
                <span className=" m-r-5 spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          <div className="text-center p-t-12">
            <span className="txt1">
              ¿No tienes usuario?
            </span>
            <a className="txt1 m-l-5" href="/register">
              Crea tu cuenta
              <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
              <FontAwesomeIcon icon={faLongArrowRight} />
            </a>
          </div>
          <div className="text-center p-t-136">
          {message && (
              <div className="alert alert-danger m-t-10" role="alert">
                {message}
              </div> 
          )}
          <CheckButton style={{ disabled: "disabled" }} ref={checkBtn} />
          </div>
        </Form>
    
  );
};
export default Login;