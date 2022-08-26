import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es obligatorio!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        El email no tiene un formato válido.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        El nombre de usuario tiene que estar entre 3 y 20 carácteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La longitud de la contraseña debe estar entre 8 y 40 carácteres.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [photo_url, setPhotoUrl] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeSurname = (e) => {
    const surname = e.target.value;
    setSurname(surname);
  };

  const onChangePhotoUrl = (e) => {
    const photo_url = e.target.value;
    setPhotoUrl(photo_url);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, name, surname, photo_url).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setLoading(false);
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
          setSuccessful(false);
        }
      );
    }
  };

  return (

        <Form onSubmit={handleRegister} ref={form} className="login100-form validate-form">
          {!successful && (
            <div>
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
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>

          <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  placeholder="Email"
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

          <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                  placeholder="Nombre"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>

              <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="surname"
                  value={surname}
                  onChange={onChangeSurname}
                  validations={[required]}
                  placeholder="Apellidos"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>

              <div className="wrap-input100 validate-input" >
                <Input
                  type="text"
                  className="input100"
                  name="photo_url"
                  value={photo_url}
                  onChange={onChangePhotoUrl}
                  placeholder="Url de la imagen de perfil"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>

              <div className="container-login100-form-btn">
            <button className="login100-form-btn" disabled={loading}>
              {loading && (
                <span className=" m-r-5 spinner-border spinner-border-sm"></span>
              )}
              <span>¡Registrate!</span>
            </button>
          </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
              <div>
              <Link to="/" className="login100-form-btn" disabled={loading}>
              <span>Inicio de sesión</span>
            </Link>
              </div>
            </div>
          )}
          <CheckButton style={{ disabled: true }} ref={checkBtn} />
        </Form>
  );
};

export default Register;