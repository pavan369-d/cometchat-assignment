import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useJobContext from "../hooks/useJobContex";

import "../styles/Jobs.css"
import toast from "react-hot-toast";

const AppliedJob = ({ id, job }) => {
  const { dispatch } = useJobContext();
  const { user } = useAuthContext();
  const { title, description, link, status, createdAt } = job;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const handleDelete = useCallback(async () => {

    try {
      const response = await fetch(`${backendUrl}/api/applies/${id}`, {
        method: "DELETE",
        headers: {
         

          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json)
      if (!response.ok) {
        console.log("Something went wrong", response.statusText);
      }

      if (response.ok) {
        // console.log(id);
        toast.success("Job Apply deleted Successfully!");
        dispatch({
          type: "DELETE_JOBAPPLY",
          payload: id,
        });
        
      }
    } catch (error) {
      console.log(error.message);
    }
  },[]);
  
  

  return (
    <div className="jobs_container">
        
      <div className="job_content">
        <h3>
          JobTitle:<span>{title}</span>
        </h3>
        <p>
          Job Description:{" "}
          <span>
            {description}
          </span>
        </p>
        <p>
          Link:{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </p>
        <p>
          Job Status: <span >{status}</span>
        </p>
        <p>
          CreatedAt:{" "}
          <span >
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </p>
      </div>
      {user && (
  <button className="material-symbols-outlined" onClick={handleDelete}>
    delete
  </button>
)}

    </div>
  );
};


export default AppliedJob