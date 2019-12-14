var express = require("express");
var http = require("http");

var port = process.argv[2];
var app = express();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("splash.html", {root: "./public"});
});
router.get('/play', function(req, res, next) {
  res.sendFile("game.html", {root: "./public"});
});

app.use(router)
http.createServer(app).listen(port);