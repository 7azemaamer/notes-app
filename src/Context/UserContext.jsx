import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props){

    const [token , setToken] = useState(localStorage.getItem("Token"));

    async function sendData(values){
        return axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp` , values)
        .then((response) => response)
        .catch((error) => error)
    }
    

    async function sendDataToLogin(values){
        return axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn` , values)
        .then((response) => response)
        .catch((error) => error)
    }
    
    function logOut(){
        localStorage.removeItem("Token");
        setToken(null);
    }

    return<UserContext.Provider value={{sendData,sendDataToLogin , token , setToken , logOut}}>
        {props.children}
    </UserContext.Provider>
}
