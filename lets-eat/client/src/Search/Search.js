import React, { useState, useEffect } from "react";
import TopNav from "../Landingpage/TopNav/TopNav";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Search() {
  let location1 = useLocation();
  //this is the infomation the people seach. I got the variables for you to use it anywhere you want
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location1.search);
    setTerm(params.get("find_desc"));
    setLocation(params.get("find_loc"));
    axios
      .get(
        `http://localhost:5000/v3/businesses/search?term=${term}&location=${location}`
      )
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  }, [location1.search, location, term]);

  ///end here
  return (
    <>
      <TopNav />
      <h1>
        {term} {location}
      </h1>
    </>
  );
}

export default Search;
