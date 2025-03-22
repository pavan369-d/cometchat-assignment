import { useContext } from "react";
import { AuthContext } from '../context/AuthContextProvider' // adjust the path

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
