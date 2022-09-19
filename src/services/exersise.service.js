import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "../services/auth.service";
const { REACT_APP_API_HOST, REACT_APP_API_PORT } = process.env
const API_URL = REACT_APP_API_HOST+":"+REACT_APP_API_PORT+"/api/exersises/"
const getAll = () => {
  return axios.get(API_URL + "findAll" , { headers: authHeader() });
}
const getAllByCreator = (idCreator) => {
  return axios.get(API_URL + "findAllByCreator/"+idCreator, { headers: authHeader() });
}

const getById = (id) => {
  return axios.get(API_URL + "findById/"+id, { headers: authHeader() });
}

const create = (name, video_url, series, repetitions, help_url) => {
    const creatorId = AuthService.getCurrentUser().id;
    return axios.post(API_URL + "create", {
        name,
        video_url,
        series,
        repetitions,
        help_url,
        creatorId
    },{ headers: authHeader() });
  };
const ExersiseService = {
  getAll,
  getById,
  getAllByCreator,
  create,
};
export default ExersiseService;