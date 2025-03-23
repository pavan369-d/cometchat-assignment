import { useState } from "react";
import UseJobContext from "../hooks/useJobContex";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";

import "../styles/Jobs.css";

const JobApplyForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = UseJobContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState("");

  const handleSubmit = async (e) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    e.preventDefault();
    const jobapply = { title, description, link, status };

    console.log(jobapply);

    try {
      const response = await fetch(`${backendUrl}/api/applies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobapply),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error("Error submiting job apply!")
        console.error("Server Error:", data);
        setEmptyField(data.emptyFields);
        setError(data.error);
      }

      if (response.ok) {
        dispatch({
          type: "CREATE_JOBAPPLY",
          payload: data,
        });
        toast.success("Job apply created Successfully!");
        setTitle("");
        setDescription("");
        setLink("");
        setStatus("");
        setError("");
        setEmptyField("");
      }
    } catch (error) {
      toast.error("Error Creating job apply!")
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="apply_form">
      <div>
        {error && <h4>{error}</h4>}
        <label htmlFor="title">Title</label>
        <input
          className={emptyField.includes("title") ? "error" : ""}
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          className={emptyField.includes("description") ? "error" : ""}
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="link">Link</label>
        <input
          className={emptyField.includes("link") ? "error" : ""}
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <input
          className={emptyField.includes("status") ? "error" : ""}
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default JobApplyForm;
