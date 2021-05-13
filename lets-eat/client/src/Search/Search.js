import React, { useState, useEffect } from "react";
import TopNav from "../Landingpage/TopNav/TopNav";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Search() {
  let location1 = useLocation();
  //this is the infomation the people seach. I got the variables for you to use it anywhere you want
  console.log("bye");
  const params = new URLSearchParams(location1.search);
  const term = params.get("find_desc");
  const location = params.get("find_loc");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `http://localhost:5000/v3/businesses/search?term=${term}&location=${location}`
        )
        .then(({ data }) => setPlaces(data))
        .catch((err) => console.log(err));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ///end here
  return (
    <>
      <TopNav />
      <h1>
        {term} {location}
      </h1>
      <ul>
        {places.map((place) => {
          return <li key={place.key}>{place.name}</li>;
        })}
      </ul>
    </>
  );
}

export default Search;
