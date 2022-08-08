import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api.spoonacular.com"
})

export default axiosClient;
