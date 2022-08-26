import axios from "axios";
import { API } from "./API";

axios.defaults.baseURL=API;
axios.interceptors.request.use(
    (config)=>{

        const token =localStorage.getItem('token');
        const auth = token ? `Bearer ${token}` : "";
        config.headers.common["Authorization"] = auth;
        return config;
    },
    (error)=>Promise.reject(error)
);
export default axios;