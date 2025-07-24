// packages import
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();
const MongoStore = require('connect-mongo');

// file imports
const connectToDb = require("./db.js");
const food = require("./routes/food.js");
const beauty = require("./routes/beauty.js");
const meds = require("./routes/meds.js");

// package uses
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://really-neon.vercel.app", "http://localhost:5173"], // "http://localhost:5173"
  credentials: true
}));
app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: "Capstone@73",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProduction, // true only in production (HTTPS)
      sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site in prod, 'lax' for local dev
      httpOnly: true
    }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize passport config
require("./config/passport")();

// db connection
connectToDb()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// route handling
app.use("/product/food", food);
app.use("/product/beauty", beauty);
app.use("/product/meds", meds);
app.use("/auth", require("./routes/auth")); // Use the auth routes

// home route
app.get("/", (req, res) => {
  res.json("in root");
});

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
