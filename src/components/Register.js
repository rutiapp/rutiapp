import React, { useState, useRef } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail } from "validator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faImage, faUsersRectangle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import AuthService from "../services/auth.service";
import { ENV } from '../env/env.dev'

const getDeleteExpired = () => {
  const itemStr = localStorage.getItem('captchaToken')
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem('captchaToken')
    return null
  }
  return item.value
}

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
}

const Register = () => {
  getDeleteExpired()
  const form = useRef()
  const checkBtn = useRef()
  let capcha = false
  if (localStorage.getItem("captchaToken")) {
    capcha = true
  }
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [photo_url, setPhotoUrl] = useState("")
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const REACT_APP_CAPCHA_ON = ENV.REACT_APP_CAPCHA_ON
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const ttl = ENV.REACT_APP_CAPCHA_TOKEN_EXP_SECONDS

  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const onChangeName = (e) => {
    const name = e.target.value
    setName(name)
  }

  const onChangeSurname = (e) => {
    const surname = e.target.value
    setSurname(surname)
  }

  const onChangePhotoUrl = (e) => {
    const photo_url = e.target.value
    setPhotoUrl(photo_url)
  }

  const onVerifyCaptcha = (token) => {
    if (token) {
      const now = new Date()
      const captchaToken = {
        value: token,
        expiry: now.getTime() + Number(ttl),
      }
      localStorage.setItem("captchaToken", JSON.stringify(captchaToken))
      capcha = true
      setToken(token)
    }
  }

  const onLoad = () => {
    captchaRef.current?.execute()
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setSuccessful(false)

    form.current.validateAll()
    if (REACT_APP_CAPCHA_ON === "false") {
      capcha = true
    }


    if (checkBtn.current.context._errors.length === 0 && capcha) {
      AuthService.register(username, email, password, name, surname, photo_url).then(
        (response) => {
          setMessage(response.data.message)
          setSuccessful(true)
          setLoading(false)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          setLoading(false)
          setMessage(resMessage)
          setSuccessful(false)
        }
      )
    } else if (!capcha) {
      const capchaError = "Debe completar correctamente la verificación de humanos"
      setMessage(capchaError)
      setLoading(false)
      setSuccessful(false)
    }
  }

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
              <FontAwesomeIcon icon={faUsersRectangle} />
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
              <FontAwesomeIcon icon={faUsersRectangle} />
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
              <FontAwesomeIcon icon={faImage} />
            </span>
          </div>
          {REACT_APP_CAPCHA_ON === "true" &&
            <HCaptcha sitekey="ed59f2ac-be66-4757-9e22-911fea1f1878" onVerify={(token) => onVerifyCaptcha(token)}
              ref={captchaRef}
              onLoad={onLoad}
            />

          }
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
              successful ? "alert alert-success bold" : "alert alert-danger"
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