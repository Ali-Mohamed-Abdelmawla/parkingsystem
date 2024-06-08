import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://raknaapi.azurewebsites.net",  
});

export default axiosInstance;