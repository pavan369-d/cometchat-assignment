import { createContext, useEffect, useReducer, useState } from "react";


export const AuthContext = createContext();

export const authReduce = (state,action)=>{
   switch(action.type){
        case "LOGIN":
            return {
                user:action.payload
            }
        case "LOGOUT":
            return {user:action.payload}
        default:
            return  state
   }
}

export const AuthContextProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(authReduce,{
        user:null,
        
    })
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if(user){
            setLoading(false)
            dispatch({type:"LOGIN",payload:user})
        }
    },[])
    return(
        <AuthContext.Provider value={{...state,dispatch,loading}}>
            {children}
        </AuthContext.Provider>
    )
}