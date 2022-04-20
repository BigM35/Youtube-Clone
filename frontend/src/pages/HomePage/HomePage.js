import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
 /* const [user, token] = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/comment", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [token]);*/
  return (
    <div className="container">
      <h1>Welcome to your homepage</h1>

      <h1>Home Page for {/*user.username*/}!</h1>
      <Link to="/videopage">Display Video!</Link>

      {/*comments &&
        comments.map((comment) => (
          <p key={comment.id}>
            {comment.user} {comment.video_id} {comment.comment} {comment.likes}
            {comment.dislikes}
          </p>
        ))*/}
    </div>
  );
};

export default HomePage;
