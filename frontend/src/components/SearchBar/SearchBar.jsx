import axios from "axios";
import { React, useState } from "react";
import useAuth from "../../hooks/useAuth";


const SearchBar = (props) => {
  const [user, token] = useAuth();
  const [filteredVideos, setFilteredVideos] = useState("mmorpg");
  
  async function fetchVideos(searchTerm = "bob ross") {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${token}&type=video&part=snippet`
    );
    } 
  return (
    <input
      className="inputfield"
      type="string"
      placeholder="Search"
      value={props.filterSearch}
      onChange={(event) => props.setFilteredVideos(event.target.value)}
    />
  );
};

export default SearchBar;
