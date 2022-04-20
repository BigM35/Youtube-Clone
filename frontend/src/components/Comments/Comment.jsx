import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();

  useEffect(() => {
    async function getVideoComments() {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/comment/${props.videoId}/`
        );
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getVideoComments();
  }, []);

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
    } catch (error) {
      console.log(error.message);
    }
  }
  function commentLayout() {
    let newEntry = {
      video_id: props.videoId,
      text: comments.text,
      likes: comments.likes,
      dislikes: comments.dislikes + 1,
    };
  }

  console.log("Comments data: ", comments);
  return (
    comments.map((comment, index) => {
      
      return (
        <>
          <table>
            <thead>
              <th>{comment.user.username}</th>
            </thead>
            <tbody>
              <tr key={index}>
                <td>{comment.text}</td>
                <td>
                  <label>
                    {""}
                    <button
                      type={"integer"}
                      name={"likes"}
                      value={comment.likes}
                      onClick={comment.likes + 1}
                    >
                      👍 {comments.likes}
                    </button>
                  </label>
                  <label>
                    {""}
                    <button
                      type="submit"
                      name={"dislikes"}
                      value={formData.dislikes}
                      onclick={handleSubmit}
                    >
                      👎
                    </button>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          
        </>
      );
    })
    <div>
          <label>
            <textarea
              type={"text"}
              name={"text"}
              value={formData.comment}
              onChange={(event) => setComments(event.target.value)}
            />
            <button
              onClick={handleSubmit}
              onChange={(event) => setComments(event.target.value)}
            >
              Add Comment
            </button>
          </label>
    </div>
  )
    

};

export default Comment;
