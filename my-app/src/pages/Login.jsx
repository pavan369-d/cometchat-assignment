import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import "../styles/Auth.css";
import toast from "react-hot-toast";

function Login() {
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleLogin = () => {
    setIsLoading(true);
    CometChat.login(uid, apiKey)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user.getUid()));
        dispatch({ type: "LOGIN", payload: user.getUid() });
        toast.success("Login Success!");
        navigate("/"); // Direct navigate
      })
      .catch((error) => {
        console.error("Login Failed: ", error);
        setIsLoading(false);
        if (error.code === "ERR_UID_NOT_FOUND") {
          setError("User ID Not Found. Please sign up first.");
        } else {
          setError("Login Failed. Please try again.");
        }
      });
  };

  return (
    <div className="auth-fields">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="UID"
        onChange={(e) => setUid(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;
