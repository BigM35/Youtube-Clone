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

const Comment = (props) => {
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
    <>
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
  </>  
  );
};

export default Comment;
