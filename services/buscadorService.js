import axiosClient from "../axios/axiosBusqueda";

//const apiKey= "apiKey=e4637bee1283459ba8ba3765cd975ad3";
//const apiKey= "apiKey=a60c366f621d4bfcb00ef85f47523958";
const apiKey= "apiKey=f6f6f4ca17c74fdb8051f432f9e7cc00";

export const getPlatos = async (setUseState) => {

    return axiosClient
        .get(`/recipes/complexSearch?apiKey=a60c366f621d4bfcb00ef85f47523958`,{
      
        })
        .then(async (res) => {
            setUseState(res.data.results); //me trae todos los platos y los asigna a setPlatos
            console.log(res.data.results);
            return res.data.results
        })
        .catch((e) => {
            console.log(`register error`, e.response);
            throw "error"
        });
};
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
