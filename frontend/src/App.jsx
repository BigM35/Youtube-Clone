// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddCommentPage from "./pages/AddCommentPage/CommentForm";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { useState } from "react";
import axios from "axios";

import DisplayVideos from "./components/DisplayVideos/DisplayVideos";



function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState('mmorpg');
  let token = "AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU"
  async function fetchVideos() {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${filteredVideos}&key=${token}`);
    setVideos(response.data.results);
  };

 

  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<DisplayVideos videos={videos} />}
          path="/addcomment"
          element={
            <PrivateRoute>
              <AddCommentPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
