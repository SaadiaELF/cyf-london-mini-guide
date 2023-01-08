const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3005;
const harrowData = require("./data/Harrow.json");
const heathrowData = require("./data/Heathrow.json");
const stratfordData = require("./data/Stratford.json");
const data = [
  { harrow: harrowData },
  { heathrow: heathrowData },
  { stratford: stratfordData },
];

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", function (request, response) {
  response.json({
    "/pharmacies": "returns an array of pharmacies in a specific area",
    "/hospitals": "returns an array of hospitals in a specific area",
    "/doctors": "returns an array of doctors in a specific area",
    "/colleges": "returns an array of colleges in a specific area",
  });
});

app.get("/:city/:category", function (request, response) {
  let cityName = request.params.city.toLowerCase();
  let category = request.params.category.toLowerCase();
  data.forEach((city) => {
    if (city.hasOwnProperty(cityName)) {
      if (city[cityName][category]) {
        response.send(city[cityName][category]);
      }
      response.status(404).send("Category not found");
    }
    response.status(404).send("City not found");
  });
});

app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT);
});
