import { React, useState } from "react";



const SearchBar = (props) => {
  const [filteredVideos, setFilteredVideos] = useState("mmorpg");
  return (
    <input
      className="inputfield"
      type="string"
      placeholder="Search"
      value={props.filterSearch}
      onChange={(event) => props.setFilterSearch(event.target.value)}
    />
  );
};

export default SearchBar;
