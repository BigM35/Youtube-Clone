import { useNavigate } from "react-router-dom";
import DisplayVideo from "../DisplayVideo/DisplayVideo";
import CommentForm from "../../pages/AddCommentPage/CommentForm";
import SearchBar from "../SearchBar/SearchBar";
import {React, useEffect, useState } from "react";
import axios from "axios";






function VideoPage() {
  const navigate = useNavigate();
  //navigate("/videopage");
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState('')
  const [filteredVideos, setFilteredVideos] = useState("mmorpg");
  let token = "AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU";
  let YTUrls = `https://www.googleapis.com/youtube/v3/search?q=${filteredVideos}&key=${token}`
  let source = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU=&part=snippet,contentDetails,statistics,status`
  // Fetch YT videos and store in video state
  async function fetchVideos(searchTerm = 'bob ross') {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${token}&type=video&part=snippet`)
    console.log('Videos fetched from VideoPage component: ',response.data)
    setVideoId(response.data.items[0].id.videoId)
    //let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU=&part=snippet`);
    //setVideos(response.data);
  }

  useEffect(() => {
    // let mounted = true;
    // if (mounted) {
    //   fetchVideos();
    // }
    // return () => (mounted = false);
    fetchVideos()
  }, []);

  return (
    <>
    //Searchbar//
      {/* <SearchBar
        filterSearch={filteredVideos}
        setFilterSearch={setFilteredVideos}
      /> */}
      //Video//
      <DisplayVideo sourceProp={videos} videoId = {videoId}/>
      //comment//
      {/* <CommentForm />
        //comment's reply// */}

    </>
  );
}

export default VideoPage;
