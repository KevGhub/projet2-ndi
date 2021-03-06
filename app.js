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
require("./config/passport-setup");

// HERUKO (DO THE SAME STEPS IN SEED FILE)
//copy/paste in .env file the name of the conf vars from heroku (ex: MONGONDB_URL)
//add the local adresse from the connect mongo (ex: .connect("mongodb://localhost/ndi-data", { useNewUrlParser: true }) )
//Then remplace the local address by the conf var in .env file like that => MONGONDB_URL=mongodb://localhost/ndi-data
// Then in .connect use the var like that => .connect( process.env.MONGONDB_URL, { useNewUrlParser: true }) )

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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

hbs.registerHelper("navLink", function (route, linkUrl, linkText) {
  let currentClass = "";
  let currentState = "";

  if (route === linkUrl) {
    currentClass = "current-link";
    currentState = "<span class='sr-only'>(current)</span>";
  }

  return `
    <a class="nav-link ${currentClass}" href="${linkUrl}">
      ${linkText} ${currentState}
    </a>
  `;
});
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//make our Express app create SESSION ------------------------------------------------
app.use(
  session({
    // MUST SAVEUNINITIALIZED AND RESAVE BE THERE OR ERROR
    saveUninitialized: true,
    resave: true,
    // SECRET SHOULD BE A STRING TAH'S DIFFERENT FOR EVERY APP
    //ALWAYS WRITE SECRET IN .ENV THATS IS IN GITIGNORE beceause secret can creat a new cookie
    secret: process.env.SESSION_SECRET,
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
  res.locals.messages = req.flash();

  //send the logged in user's info to hbs files for ALL pages
  // (req.user is defined by Passport and contains the logged in user's info)
  // req is defined in passport.session() + add the name of data schema name in model
  res.locals.loggedUser = req.user;

  res.locals.route = req.path;

  // tell Express we are ready to move to the routes now
  // (need this or your pages will stay laoding forever)
  next();
});

// default value for title local
app.locals.title = "Nos Douces Incivilités";

const index = require("./routes/index");
app.use("/", index);

const reqCategories = require("./routes/requests/req-categories-router");
app.use("/", reqCategories);

const auth = require("./routes/autho-router");
app.use("/", auth);

const account = require("./routes/user-account-router");
app.use("/", account);

const IncCategories = require("./routes/incivilities/inc-categories-router");
app.use("/", IncCategories);

module.exports = app;

// HEROKU

/* 
HEROKU CREATION STEP'S
1- create app
2- go to app, ressources tab (add Mlab)
3- (optional for data) Settings >> config bar >> MONGO_URL : copy the link only >> open mongoDB (and it see that = accept)
4- On code :in file env. defined varName=password // on code app.js remplacer par varName (for secret ; email/pass ; cloudinarycount/pass)
5- in config bar section (DON'T put the port number in heroku setting)
6- heroku git:remote -a AppNameInHeroku
7-git push heroku master (after enough modification - push for user on URL)


ON TERMINAL, for heroku
brew tap heroku/brew && brew install heroku    (One time for install)

heroku login

heroku git:remote -a nosdoucesincivilites2

git push heroku master    (after enough modification - push for user on URL)


heroku open (open on browser - without deploy for user)


heroku run is

heroku logs

heroku run node bin/admin-seed.js
*/

