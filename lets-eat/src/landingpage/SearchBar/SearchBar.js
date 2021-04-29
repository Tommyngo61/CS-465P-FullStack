import React from "react";
import "./SearchBar.css";
function SearchBar() {
  return (
    <form action="">
      <div className="searchArea">
        <div className="currentLocation">
          <label htmlFor="location">Current location</label>
          <input type="input" id="location" />
        </div>
        <div className="searchBar">
          <label htmlFor="searchBar">Search</label>
          <input type="input" id="searchBar" />
        </div>
        <div className="nearBar">
          <label htmlFor="Miles">Miles</label>
          <input type="input" id="Miles" />
        </div>
      </div>
      <div className="btn">
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </div>
    </form>
  );
}

export default SearchBar;
