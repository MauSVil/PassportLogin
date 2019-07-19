const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    passReqToCallback: true
  })
);

router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    passReqToCallback: true
  });
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

module.exports = router;
