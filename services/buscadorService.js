import axiosClient from "../axios/axiosBusqueda";

//const apiKey= "apiKey=e4637bee1283459ba8ba3765cd975ad3";
//const apiKey= "apiKey=a60c366f621d4bfcb00ef85f47523958";
const apiKey= "apiKey=2f34f3b6abb54bc48a7dacd61c0353e9";

export const getPlatosXNombre = async (busqueda) =>{
    return axiosClient
        .get(`/recipes/complexSearch?${apiKey}&query=${busqueda}`,{
        })
        .then(function(res) {
            console.log(res.data.results)
            return res.data.results
        })
        .catch(function(){
    
            throw "error"
        });
};
export const getPlatosXId = async (id) =>{
    return axiosClient
        .get(`/recipes/${id}/information?${apiKey}`,{
        })
        .then(function(res) {
            console.log(res.data)
            return res.data
        })
        .catch(function(){
    
            throw "error"
        });
};
