const express = require("express");
const session = require("express-session");
const passport = require("passport");

function isLogenIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

require("./auth");

const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google </a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("something went wrong...");
});

app.get("/protected", isLogenIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logOut(() => {
    req.session.destroy(() => {
      res.send("Goodbye");
    });
  });
});

app.listen(3001, () => console.log("Server run on port 3001"));
