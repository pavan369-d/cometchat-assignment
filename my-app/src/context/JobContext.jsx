import { createContext, useReducer } from "react";

export const JobContext = createContext();

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case "GET_JOBAPPLIES":
      return {
        jobApplies: action.payload,
      };
    case "CREATE_JOBAPPLY":
      return {
        jobApplies: [action.payload, ...state.jobApplies],
      };
    case "SET_JOBAPPLY":
      return {jobApplies:action.payload}
    case "DELETE_JOBAPPLY":
      console.log(action.payload)
      return {
        jobApplies: state.jobApplies.filter((w)=>w._id!==action.payload)
      };
    default:
      return state;
  }
};

export const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, {
    jobApplies: [],
  });
  
  return (
    <JobContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};
