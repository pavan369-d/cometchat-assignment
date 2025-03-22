import  {CometChat}  from "@cometchat/chat-sdk-javascript";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'

import "../styles/Auth.css"
import toast from "react-hot-toast";


function Login(){
   const [uid,setUid] = useState("");
   const [error,setError] = useState("");
   const [isLoading,setIsLoading] = useState(false);
   const {dispatch} = useAuthContext();

   const navigate = useNavigate();
   const apiKey = import.meta.env.VITE_API_KEY

   const handleLogin = ()=>{
    setIsLoading(true);
       CometChat.login(uid,apiKey)
       .then((user)=>{
        console.log("Login Successful: ",user.getName())
        localStorage.setItem("user",JSON.stringify(user.getUid()))
        
        if(user.getUid()){
          dispatch({type:"LOGIN",payload:user.getUid()})
          toast.success("Login Success!");
          setTimeout(()=>{
            navigate("/");
          },1500)
        }
      })
       .catch((error)=>{
        toast.error("Error Loggging in!")
        setIsLoading(false);
        console.error("Login Failed: ",error);
        if(error.code === "ERR_UID_NOT_FOUND"){
          setError("User Id Not Found. Please sign up first.")
        }else if(error.code === "ERR_INVALID_AUTH_TOKEN"){
          setError("Invalid authentiaction token.")
        }else{
          setError("Login Failed. Please try again.")
        }
        setTimeout(()=>{
          navigate("/login");
        })
        
       })
      console.log("User login successful")
   }

   if(error){
    return <div>{error}</div>
   }
    return (
        <div className="auth-fields">
          <h2>Login</h2>
          <input 
          type="text"
          placeholder="UID"
          onChange={(e)=>setUid(e.target.value)} />
          <button onClick={handleLogin} disabled={isLoading}>Login</button>
        </div>
    )
}

export default Login