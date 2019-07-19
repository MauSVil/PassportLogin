const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// Save user between views
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = User.findOne({ email: email });
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The email aready exists")
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

// passport.use(
//   "local-signin",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true
//     },
//     async (req, email, password, done) => {
//       const user = await User.findOne({ email: email });
//       if (!user) {
//         return done(null, false, req.flash("signinMessage", "User Incorrect"));
//       }
//       if (!user.comparePassword(password)) {
//         return done(
//           null,
//           false,
//           req.flash("signinMessage", "Incorrect Password")
//         );
//       }
//       done(null, user);
//     }
//   )
// );
