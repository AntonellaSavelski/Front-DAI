import { useContext } from "react";
import React from "react";

export const initialState ={
    token:'',
    menu:{
        platos:[],
        precioTotal: 0,
        puntajeSaludable:0,
        promedioSaludable:0,
        platosNoVeganos: 0,
        platosVeganos:0
    }
};
export const actionTypes={
    SetToken: 'SET_TOKEN',
    SetMenu:'SET_MENU',
    SetMenuPlatos:'SET_MENU_PLATOS',
    SetMenuPrecio:'SET_MENU_PRECIO',
    SetAddPrecio:'SET_ADD_PRECIO',
    SetMenuSaludable:'SET_MENU_SALUDABLE',
    SetAddSaludable:'SET_ADD_SALUDABLE',
    SetMenuPromedio:'SET_MENU_PROMEDIO',
    SetMenuNoVegano:'SET_MENU_NO_VEGANO',
    SetAddNoVegano:'SET_ADD_NO_VEGANO',
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

            case actionTypes.SetMenuSaludable:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    puntajeSaludable:action.value
                }                
            };
            case actionTypes.SetAddSaludable:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    puntajeSaludable:state.menu.puntajeSaludable + action.value
                }                
            };
            case actionTypes.SetMenuPromedio:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    promedio:state.menu.puntajeSaludable /state.menu.platos.length
                }                
            };

            case actionTypes.SetMenuNoVegano:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platosNoVeganos:action.value
                }                
            };
            case actionTypes.SetAddNoVegano:
            return{
                ...state,
                menu:{
                    ...state.menu,
                    platosNoVeganos:state.menu.platosNoVeganos + action.value
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