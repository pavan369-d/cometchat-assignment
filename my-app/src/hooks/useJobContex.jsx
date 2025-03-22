import { useContext } from "react"
import { JobContext } from "../context/JobContext"


const useJobContext = () =>{
    const context = useContext(JobContext)
 
    if(!context){
        throw new Error('useJobContext must be inside JOBContextprovider')
    }
    return context
}

export default useJobContext