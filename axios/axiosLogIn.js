import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org"
})
export default axiosClient;