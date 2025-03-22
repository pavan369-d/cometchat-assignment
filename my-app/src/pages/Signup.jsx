
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/Auth.css"
import toast from "react-hot-toast";

const Signup = ()=>{
    const [uid,setUid] = useState("");
    const [name,setName] = useState("");
    const [error,setError] = useState("");
    const [isLoading,setIsLoading] = useState(false);
   
    const navigate = useNavigate()
    
    const apiKey = import.meta.env.VITE_API_KEY
    const handleSignup = async()=>{
      
      if(!uid || !name){
        alert("Please enter both UID and Name");
        return;
      }

      const user = new CometChat.User(uid);
      user.setName(name);
      setIsLoading(true)
      try{
        const createdUser = await CometChat.createUser(user,apiKey)
        console.log("User created successfully!",createdUser.getName())
        const userName =  createdUser.getName();
        // localStorage.setItem("user",JSON.stringify(userName))
        if(userName){
          toast.success("User created successfully!")
           setTimeout(function(){
            navigate("/login")
           })
        }

        
    }catch(error){
      setError(error);
        toast.error("Error signing up!")
        console.error("Signup Failed!",error);
      }finally{
        setIsLoading(false)
      }
       
    }

    return(
        <div className="auth-fields">
         
            <h2>Signup</h2>
            <input 
            placeholder="UID"
             type="text"
             onChange={(e)=>setUid(e.target.value)} />
             <input 
             type="text"
             placeholder="name"
             onChange={(e)=>setName(e.target.value)} />
           
             <button onClick={handleSignup} disabled={isLoading}>Signup</button>
        </div>
    )
}

export default Signup