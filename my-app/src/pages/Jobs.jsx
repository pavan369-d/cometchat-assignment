import { useEffect } from "react"
import useJobContext from "../hooks/useJobContex";
import AppliedJob from "../components/AppliedJob";

import "../styles/Jobs.css"
import toast from "react-hot-toast";

const Jobs = ()=>{
    const {jobApplies,dispatch} = useJobContext();

    useEffect(()=>{
        const backendUrl =import.meta.env.VITE_BACKEND_URL;
        getData(`${backendUrl}/api/applies`)
       async function getData(url){
        try{
            const response = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                }
            })
            const data = await response.json();
            if(response.ok){
                dispatch({type:"GET_JOBAPPLIES",payload:data})
            }
            console.log(data);
        }catch(error){
            toast.error("Error getting job applies:",error)
            console.log(error);
        }
        }
    },[])
    return(
        <div>
            {jobApplies && jobApplies.map((item)=><AppliedJob key={item._id} id={item._id} job={item}/>)}
        </div>
    )
}

export default Jobs