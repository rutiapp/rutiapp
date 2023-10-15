import axios from "axios";
import captchaHeader from "../services/headers/captcha-header";
import { ENV } from '../env/env.dev'

const REACT_APP_API_HOST = ENV.REACT_APP_API_HOST
const API_URL = REACT_APP_API_HOST + "/api/auth/"

const register = (username, email, password, name, surname, photo_url) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
    surname,
    photo_url,
  }, { headers: captchaHeader() });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    }, { headers: captchaHeader() })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
}
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
}
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;