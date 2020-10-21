const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const connectDB = require("./config/connectMongo");
const MongoStore = require("connect-mongo")(session);

// Load Config
dotenv.config({ path: "./config/config.env" });

connectDB();

// Passport Config
require("./config/passport")(passport);
require("./config/passportfb")(passport);

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Express session Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

// routes

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/Register"));
app.use("/", require("./routes/Home"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/CreatePost"));
app.use("/", require("./routes/Offers"));
app.use("/", require("./routes/Category"));
app.use("/offers", require("./routes/OfferCategory"));
app.use("/", require("./routes/OfferPost"));
app.use("/", require("./routes/MyPosts"));
app.use("/", require("./routes/MyOffers"));
app.use("/", require("./routes/Editpost"));
app.use("/", require("./routes/Editoffer"));
app.use("/", require("./routes/DeletePost"));
app.use("/", require("./routes/DeleteOffer"));

app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
