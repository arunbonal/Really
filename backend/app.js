// packages import
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();

// file imports
const connectToDb = require("./db.js");
const food = require("./routes/food.js");
const beauty = require("./routes/beauty.js");
const meds = require("./routes/meds.js");

// package uses
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json());

// Session Middleware
app.use(
  session({ 
    secret: "Capstone@73",
    resave: true, 
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: false, // set to true if using https
      sameSite: 'lax',
      httpOnly: false // Allow JavaScript access for debugging
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
