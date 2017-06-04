
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var session = require("express-session");

// bring in the models
var db = require("./models");

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/controllers");

app.use("/", routes);
app.use("/subject", routes);
app.use("/create-subject", routes);
app.use("/topic", routes);
app.use("/create-topic", routes);
app.use("links", routes);
app.use("create-links", routes);
app.use("/signup",routes);
app.use("/login",routes);
app.use("/welcome",routes);


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
  app.listen(port);
  console.log("app is listening on port: " + port)
});




// // initial requires
// var express = require('express');
// var bodyParser = require('body-parser');

// // setup the express app
// var app = express();

// // use body-parser to help express handle requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.text());
// app.use(bodyParser.json({type:'application/vnd.api+json'}));

// // set up handlebars for express
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main',
//     extname: '.handlebars',
//     layoutsDir: 'app/views/layouts'
// }));
// app.set('view engine', 'handlebars');
// app.set('views', __dirname + '/app/views');

// // load the static files
// var staticContentFolder = __dirname + '/app/public';
// app.use(express.static(staticContentFolder));


// // require passport.js
// // require("./app/config/passport.js")(app)

// // express sitemap app
// // var sitemap = require('express-sitemap');
// // var map = sitemap({
// //     generate: app
// // });

// // app.get('/sitemap.xml', function(req, res) { // send XML map
// //     map.XMLtoWeb(res);
// // }).get('/robots.txt', function(req, res) { // send TXT map
// //     map.TXTtoWeb(res);
// // });

// // require the api and html paths
// require("./routes/subject-api-routes.js")(app)
// require("./routes/topic-api-routes.js")(app)
// require("./routes/links-api-routes.js")(app)
// require("./routes/html-api-routes.js")(app)
// // require all of the database connections
// // require("./app/models/db_relations.js")(app)


// // start the server
// var PORT = process.env.PORT || 8080;
// app.listen(PORT, function(){
// 	console.log('App is listening: ' + PORT);
// });




