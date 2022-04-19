import { useEffect } from "react";
import SearchBar from "./SearchBar";


  return (
    <div>
      <SearchBar
        filterSearch={filteredVideos}
        setFilteredSearch={setFilteredVideos}
      />
      <VideoSearch videosProp={videos} />
    </div>
  );
}
export default VideoSearch;
