import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "../services/auth.service";
const { REACT_APP_API_HOST } = process.env
const API_URL = REACT_APP_API_HOST + "/api/weights/"
let userId = null
if(AuthService.getCurrentUser()) {
  userId = AuthService.getCurrentUser().id;
}

const create = (quantity_kg, exersiseId) => {
    return axios.post(API_URL + "create", {
        quantity_kg,
        userId,
        exersiseId
    },{ headers: authHeader() });
  };

const getLastWeights = (exersiseId) => {
  return axios.get(API_URL + "findWeightsByExersise/" + exersiseId,{ headers: authHeader() });
}

const getLatestWeight = (exersiseId) => {
  return axios.get(API_URL + "findLastWeightByExersise/" + exersiseId,{ headers: authHeader() });
}

const getLastWeightsByUser = () => {
  return axios.get(API_URL + "findLastWeightsByUser",{ headers: authHeader() });
}

const WeightService = {
  create,
  getLastWeights,
  getLatestWeight,
  getLastWeightsByUser
};
export default WeightService;