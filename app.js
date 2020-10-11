const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
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

PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// routes

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/Register"));
app.use("/", require("./routes/Home"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/CreatePost"));
app.use("/", require("./routes/Offers"));

app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
