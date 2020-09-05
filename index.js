const express = require("express");
const app = express();
const port = 8000;

const db = require("./config/mongoose");

// include layouts library
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// Give access or set path for static files
app.use(express.static("./assets"));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Use express router
app.use("/", require("./routes/index"));

app.listen(port, (err) => {
   if (err) {
      console.log(`Error on running the server: ${err}`);
   }
   console.log(`Server is running on port: ${port}`);
});
