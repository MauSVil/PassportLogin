const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

// Init
const app = express();
require("./database");
require("./passport/local-auth");

//settings
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash("signupMessage");
  next();
});

// Routes
const paths = require("./routes/index");
app.use("/", paths);

//startomg the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
