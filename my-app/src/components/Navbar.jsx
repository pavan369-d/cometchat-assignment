import { Link, useNavigate } from "react-router-dom"
import { CometChat } from "@cometchat/chat-sdk-javascript"

import "../styles/Nav.css"
import { useAuthContext } from "../hooks/useAuthContext"
import toast from "react-hot-toast";
function Navbar(){
    const {user,dispatch} = useAuthContext();
    const navigate = useNavigate();
    const handleLogout=()=>{
        CometChat.logout();
        console.log("Logout success!")
        toast.success("Logout Success!");
        setTimeout(function(){
            dispatch({type:"LOGOUT",payload:null})
            navigate("/login")
        })
        
    }
    return(
        <nav className="navbar">
            {user && (
                <div>
                     <Link to="/">Chat</Link>
                     <Link to="/jobapplies">Jobs</Link>
                     <Link to="/addjobs">AddJobs</Link>
          
            <span onClick={handleLogout}>Logout</span>
                </div>
            )}
            {!user &&(<div>
                 <Link to="/signup">Signup</Link>
                 <Link to="/login">Login</Link>
            </div>)}
           
        </nav>
    )
}

export default Navbar