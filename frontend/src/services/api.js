import axios from "axios";

const API = axios.create({
  baseURL: "https://rewardwise-f236.onrender.com/api",
});

export default API;