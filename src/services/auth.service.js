import axios from "axios";
const { REACT_APP_API_HOST } = process.env
const API_URL = REACT_APP_API_HOST+"/api/auth/"
const register = (username, email, password, name, surname, photo_url) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
    surname,
    photo_url
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
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