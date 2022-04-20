const SearchBar = (props) => {
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
