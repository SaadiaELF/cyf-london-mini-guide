const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.json({
    "/pharmcies": "retruns an array of pharmacies in a specific area",
    "/hospitals": "retruns an array of hospitals in a specific area",
    "/doctors": "retruns an array of doctors in a specific area",
  });
});

app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT);
});
