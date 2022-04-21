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
  
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();

  const [newComment, setNewComment] = useState([])
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
  

  async function addNewEntry(entries) {
    try{
      let response = await axios.post("http://127.0.0.1:8000/comment/", entries)
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
      let commentObj = [...comments, response.data];
      setComments(commentObj)
    }catch(err){
      console.log(`Error: ${err}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let newEntry = {
      video_id: props.videoId,
      text: comments.text,
      likes: comments.likes,
      dislikes: comments.dislikes + 1,
    };
    addNewEntry(newEntry);
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
                      value={comments.dislikes}
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
    }),
    <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={comments.text}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <button
              type="submit"
            
            >
              Add Comment
            </button>
          </label>
    </form>
  )
};

export default Comment;
