import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api.spoonacular.com"
})

export const getLogIn= async () =>{
    return axiosClient.get('/recipes/complexSearch').then(response =>{
        if(response.status < 300){
            return response.data
        }
        else {
            console.log("Error, algo no funciona")
        }
    })
    .catch(function(err) {
        console.log("Catch, algo no funciona", err)
    })
}