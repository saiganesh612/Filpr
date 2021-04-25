const express = require("express");
const app = express()
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose")
const localStrategy = require("passport-local");

const User = require("./models/Auth")

const authRoutes = require("./routes/Auth");
const fantasyRoutes = require("./routes/fantasy")

//Connecting to database
mongoose.connect("mongodb://localhost:27017/Flipr", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongoose connection denied"));
db.once("open", () => {
    console.log("Mongoose connection established!!");
})

//Passport custom login Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.redirect("/auth/login")
})

app.use("/auth", authRoutes)
app.use(fantasyRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
