import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
  user: "",
  video_id: "",
  comment: "",
  likes: "",
  dislikes: "",
};

const AddCommentPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    initialValues,
    addNewComment
  );
  const [comment, setComment] = useState('')
  const[likes, setLikes] = useState()
  const[dislikes, setDislikes] = useState()
  async function addNewComment() {
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/comment/",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setComment();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          User:{""}
          <input
            type={"text"}
            name={"user"}
            value={formData.user}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Video:{""}
          <input
            type={"text"}
            name={"video_id"}
            value={formData.video_id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comment:{""}
          <input
            type={"text"}
            name={"comment"}
            value={formData.comment}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Likes:{""}
          <button
            type={"integer"}
            name={"likes"}
            value={formData.likes}
            onClick={handleInputChange}
          >Like</button>
        </label>
        <label>
          Dislikes:{""}
          <button
            type={"integer"}
            name={"dislikes"}
            value={formData.dislikes}
            onclick={handleInputChange}
          >Dislike</button>
        </label>

        <button>Add Comment</button>
      </form>
    </div>
  );
};

export default AddCommentPage;
