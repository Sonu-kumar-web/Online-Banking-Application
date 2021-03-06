const express = require("express");
const app = express();
const port = 8000;

const db = require("./config/mongoose");

//  Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo")(session);

const cookieParser = require("cookie-parser");
// for encode POST request
app.use(express.urlencoded());

// use cookie as middleware
app.use(cookieParser());

// include layouts library
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// Extract our style and script tag from sub-pages and put it into head of layout page
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Give access or set path for static files
app.use(express.static("./assets"));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
   session({
      name: "codeial",
      secret: "xyzsomething",
      saveUninitialized: false,
      resave: false,
      cookie: {
         maxAge: 1000 * 60 * 100,
      },
      store: new MongoStore(
         {
            mongooseConnection: db,
            autoRemove: "disabled",
         },
         function (err) {
            console.log(err || "Connect-mongodb setup ok");
         }
      ),
   })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
   if (err) {
      console.log(`Error on running the server: ${err}`);
   }
   console.log(`Server is running on port: ${port}`);
});
