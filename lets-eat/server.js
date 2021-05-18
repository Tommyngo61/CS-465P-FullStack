const express = require("express");
const yelp = require("yelp-fusion");
const app = express();
var cors = require("cors");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const fetch = require("node-fetch");

//Bodyparser Middleware
app.use(cors());
app.use(express.json());

// let getData = async () => {
const client = yelp.client(process.env.YELP_API);
const getData = async (hi) => {
  const data = await client
    .search(hi)
    .then((response) => response.jsonBody.businesses)
    .catch((e) => {
      console.log(e);
    });
  return data;
};
//this is where I get all bussiness
app.get("/v3/businesses/search", async (req, res) => {
  console.log(req.url);
  const bye = req.url.split("?");
  console.log(bye);
  const hi = parseParams(bye[1]);
  console.log(hi);
  const data = await getData(hi); // const data = await getData(hi);
  res.send(data);
  res.end();
});

//this is where I get the review for each bussiness
let myHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.YELP_API}`,
};
app.get("/v3/businesses/:id", async (req, res) => {
  console.log(req.url);
  console.log(req.params.id);
  const data = await fetch(
    `https://api.yelp.com/v3/businesses/${req.params.id}/reviews`,
    { Method: "GET", headers: myHeader }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
  res.send(data);
  res.end();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

const parseParams = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring);

  const obj = {};

  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};
