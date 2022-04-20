import { useNavigate } from "react-router-dom";
import DisplayVideo from "../DisplayVideo/DisplayVideo";
import SearchBar from "../SearchBar/SearchBar";
import {React, useEffect, useState } from "react";
import axios from "axios";





function VideoPage() {
  const navigate = useNavigate();
  navigate("/videopage");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState("mmorpg");
  let token = "AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU";
  let YTUrls = `https://www.googleapis.com/youtube/v3/search?q=${filteredVideos}&key=${token}`
  let source = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU=&part=snippet,contentDetails,statistics,status`
  // Fetch YT videos and store in video state
  async function fetchVideos() {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU=&part=snippet,contentDetails,statistics,status`);
    setVideos(response.data);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchVideos();
    }
    return () => (mounted = false);
  }, []);

  return (
    <>
    //Searchbar//
      <SearchBar
        filterSearch={filteredVideos}
        setFilterSearch={setFilteredVideos}
      />
      //Video//
      <DisplayVideo sourceProp={videos}/>
      //comment//
      
        //comment's reply//

    </>
  );
}

export default VideoPage;
