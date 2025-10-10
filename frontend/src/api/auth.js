import  axios  from "axios";



const API_URL = "http://localhost/api"

export const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const register = (data) => axios.post(`${API_URL}/register`, data);
export const logout = () => axios.post(`${API_URL}/logout`, {}, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

