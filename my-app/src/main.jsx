import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { JobContextProvider } from "./context/JobContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      
      
          <JobContextProvider>
            <App />
          </JobContextProvider>
       
     
    </AuthContextProvider>
  </StrictMode>
);
