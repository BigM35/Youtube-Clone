//import { useNavigate } from "react-router-dom";
import DisplayVideo from "../DisplayVideo/DisplayVideo";
import Comment from "../Comments/Comment";
import {React, useEffect, useState } from "react";
import axios from "axios";






function VideoPage() {
  //const navigate = useNavigate();
  //navigate("/videopage");
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState('')
  let token = "AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU";
  //let source = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU=&part=snippet,contentDetails,statistics,status`
  // Fetch YT videos and store in video state
  async function fetchVideos(searchTerm = 'bob ross') {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${token}&type=video&part=snippet`)
    console.log('Videos fetched from VideoPage component: ',response.data.items)
    setVideoId(response.data.items[0].id.videoId)
    //let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU=&part=snippet`);
    setVideos(response.data.items);
  }

  useEffect(() => {
     let mounted = true;
     if (mounted) {
      fetchVideos();
     }
     return () => (mounted = false);
  },[]);

  return (
    <>
      
      <DisplayVideo sourceProp={videos} videoId = {videoId} title={videos}/>
    
      <Comment videoId = {videoId}/>
       

    </>
  );
}

export default VideoPage;
