require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

// RUN PASSPORT ----------------------------------------------------------------------------
// run the code inide the file, no need a const cause won't use it in any other page
require('./config/passport-setup');

mongoose
  .connect("mongodb://localhost/ndi-data", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}🙅‍♂️"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));


//make our Express app create SESSION ------------------------------------------------
app.use(session({
  // MUST SAVEUNINITIALIZED AND RESAVE BE THERE OR ERROR
  saveUninitialized: true,
  resave: true,
  // SECRET SHOULD BE A STRING TAH'S DIFFERENT FOR EVERY APP
  //ALWAYS WRITE SECRET IN .ENV THATS IS IN GITIGNORE beceause secret can creat a new cookie
  secret: 'hiohiehqdjidùsqhs$fiaa',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})
);

//PASSPORT SESSION & LOGIN / LOGOUT ------------------------------------------------
// passport setup lines MUST be BELOW session
// set passport's methods to use in our routes (properties and methods for req)
app.use(passport.initialize());
// make passport manage our user session and be able to use req.nameOfSchemaModel
app.use(passport.session());


//allow our routes to use FLASH MESSAGES --------------------------------------------------
// (feedback messages before redirecting)
// (flash messages need sessions to work)
app.use(flash());
app.use((req, res, next) => {
  // send flash message to the hbs files
  // (req.flash() comes from the 'connect-flash' npm package)
  res.locals.message = req.flash();

  //send the logged in user's info to hbs files for ALL pages
  // (req.user is defined by Passport and contains the logged in user's info)
  // req is defined in passport.session() + add the name of data schema name in model
  res.locals.loggedUser = req.user;

  // tell Express we are ready to move to the routes now
  // (need this or your pages will stay laoding forever)
  next();
})

// default value for title local
app.locals.title = "Nos Douces Incivilités";

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/autho-router");
app.use("/", auth);

const account = require("./routes/user-account-router");
app.use("/", account);

module.exports = app;
