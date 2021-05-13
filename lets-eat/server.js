const express = require("express");
const yelp = require("yelp-fusion");
const app = express();
var cors = require("cors");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

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

app.get("/v3/businesses/search", async (req, res) => {
  console.log(req.url);
  const bye = req.url.split("?");
  const hi = parseParams(bye[1]);
  console.log(hi);
  const data = await getData(hi); // const data = await getData(hi);
  res.send(data);
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
