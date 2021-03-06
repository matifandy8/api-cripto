const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const requestopts = {
  convert: "USD",
  headers: {
    "X-CMC_PRO_API_KEY": "d19ecbed-5737-444a-95f1-67318e925cbc",
  },
};


//Init Middleware
app.use([express.json({ extended: false }), cors()]);

// app.set("json spaces", 2);

// .com/v1/cryptocurrency/info?id=1
// .com/v1/cryptocurrency/map
// .com/v1/cryptocurrency/map?start=10&limit=20
// .com/v1/cryptocurrency/listings/latest
// .com/v1/cryptocurrency/quotes/latest?symbol=BTC
// .com/v1/fiat/map
// .com/v1/fiat/map?start=1&limit=10



app.get("/currencies", (req, res) => {
  let coin = req.params.coin;
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      requestopts
    )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}


//App listen to PORT
app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});




