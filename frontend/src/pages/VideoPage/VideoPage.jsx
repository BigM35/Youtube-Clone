import DisplayVideo from "../../components/DisplayVideo/DisplayVideo";
import SearchBar from "../SearchPage/SearchBar";
import React from "react";

function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState("mmorpg");
  let token = "AIzaSyAqrE_B__qKlCdpRemjYOXyr3CtCyeJlwU";

  // Fetch YT videos and store in video state
  async function fetchVideos() {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${filteredVideos}&key=${token}`
    );
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
      <SearchBar
        filterSearch={filteredVideos}
        setFilterSearch={setFilteredVideos}
      />
      <DisplayVideo />
    </>
  );
}

export default VideoPage;
