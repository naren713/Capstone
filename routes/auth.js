const passport = require("passport");

const router = require("express").Router();

// Google authenticate

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/home");
  }
);

// Facebook Authenticate

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["user_friends", "user_photos"] })
);

// Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/home");
  }
);

// Logout User
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
