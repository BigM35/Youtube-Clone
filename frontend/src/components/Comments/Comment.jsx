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
  const [comments, setComments] = useState([])
  const[likes, setLikes] = useState()
  const[dislikes, setDislikes] = useState()
  
  async function getVideoComments(){
    try{
      let response = await axios.get( `http://127.0.0.1:8000/comment/kfoigjd`)
      setComments(response.data)
    } catch (err){
      console.log(err)
    }
  }
  
  
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
  function handleSubmits(){
    let newEntry = {
    video_id: "",
    text: "",
    likes: "",
    dislikes: "",
    }
  }


  console.log("Comments data: ", comments)
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
                value={formData.likes}
                onClick={handleInputChange}
              >Like</button>
            </label>
            <label>
              {""}
              <button
                type={"integer"}
                name={"dislikes"}
                value={formData.dislikes}
                onclick={handleInputChange}
              >Dislike</button>
            </label>
              </td>
            </tr>
          </tbody>
        </table>
          <div>
            {user.username}
          </div>
          <div>
            <label>
              <textarea 
                type={"text"}
                name={"text"}
                value={formData.comment}
                onChange={handleInputChange}
              />
              <button>Add Comment</button>
            </label>
          </div>
          
            <label>
              {""}
              <button
                type={"integer"}
                name={"likes"}
                value={formData.likes}
                onClick={handleInputChange}
              >Like</button>
            </label>
            <label>
              {""}
              <button
                type={"integer"}
                name={"dislikes"}
                value={formData.dislikes}
                onclick={handleInputChange}
              >Dislike</button>
            </label>

          
      </>  

      )
    })
  );
};

export default Comment;
