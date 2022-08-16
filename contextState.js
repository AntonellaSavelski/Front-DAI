import { useContext } from "react";
import React from "react";

export const initialState ={
    token:'',
    menu:{
        platos:[],
        precioTotal: 0,
        tiempoTotal:0,
        platosVegetarianos: 0,
        platosVeganos:0
    }
};
export const actionTypes={
    SetToken: 'SET_TOKEN',
    SetMenu:'SET_MENU',
    SetMenuPlatos:'SET_MENU_PLATOS',
    SetMenuPrecio:'SET_MENU_PRECIO',
    SetAddPrecio:'SET_ADD_PRECIO',
    SetMenuTiempo:'SET_MENU_TIEMPO',
    SetAddTiempo:'SET_ADD_TIEMPO',
    SetMenuVegetariano:'SET_MENU_VEGETARIANO',
    SetAddVegetariano:'SET_ADD_VEGETARIANO',
    SetMenuVegano:'SET_MENU_VEGANO',
    SetAddVegano:'SET_ADD_VEGANO',
};
export const reducer =(state ={}, action)=>{
    switch (action.type){
        case actionTypes.SetToken:
            return{
                ...state,
                token:action.value
            };
            case actionTypes.SetMenu:
            return{
                ...state,
                menu:action.value
            };
            case actionTypes.SetMenuPlatos:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platos:action.value
                }                
            };

            case actionTypes.SetMenuPrecio:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    precioTotal:action.value
                }                
            };
            case actionTypes.SetAddPrecio:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    precioTotal:state.menu.precioTotal + action.value
                }                
            };

            case actionTypes.SetMenuTiempo:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    tiempoTotal:action.value
                }                
            };
            case actionTypes.SetAddTiempo:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    tiempoTotal:state.menu.tiempoTotal + action.value
                }                
            };

            case actionTypes.SetMenuVegetariano:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platosVegetarianos:action.value
                }                
            };
            case actionTypes.SetAddVegetariano:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platosVegetarianos:state.menu.platosVegetarianos + action.value
                }                
            };

            case actionTypes.SetMenuVegano:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platosVeganos:action.value
                }                
            };
            case actionTypes.SetAddVegano:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platosVeganos:state.menu.platosVeganos + action.value
                }                
            };

        default:
            return state;
    }
}
export const initialContext = {
    contextState: initialState,
    setContextState: () => {},
};

const Cont = React.createContext(initialContext);

export function ContextProvider({ children, initial = initialState}){
    const [state, dispatch] = React.useReducer(reducer,initial);

    const contextState = state;
    const setContextState = dispatch;

    return <Cont.Provider value={{ contextState, setContextState}}>{children}</Cont.Provider>;
}
export const useContextState = () => useContext(Cont);