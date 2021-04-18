var express = require("./node_modules/express");
var bodyParser = require("./node_modules/body-parser");
var app = express();
var database = require("../database/node_connect_db");
var path = require("path");
var cors = require("cors");

// bodyParser is a type of middleware
// It helps convert JSON strings
// the 'use' method assigns a middleware
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

const hostname = 'localhost';
const port = 4000;

// http status codes
const statusOK = 200;
const statusNotFound = 404;
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "1728000",
  "Content-Length": "0",
  "Content-Type": "text/plain"
};

// Handle GET (all) request
app.get("/", function(req, res) {
  // send response
  console.log("Got request!");
  res.statusCode = statusOK;
  res.set(headers);
  database.admin_get_all_kalas(function(err, kalasArray) {
    console.log(kalasArray);
    res.send(kalasArray);
  });
});

app.get("/all_kalas_array", function(req, res) {
  // send response
  res.statusCode = statusOK;
  res.set(headers);
  database.admin_get_all_kalas(function(err, kalasArray) {
    res.send(kalasArray);
  });
});

app.get('/all_kalas_hosts', function(req, res) {
    // send response
    res.statusCode = statusOK;
    res.set(headers);
    database.get_all_kalas_hosts(function(err, kalasArray){
        res.send(kalasArray);
    });
});

app.get('/get_users', function(req, res) {
    // send response
    res.statusCode = statusOK;
    res.set(headers);
    database.get_users(function(err, userArray){
        res.send(userArray);
    });
});

app.get("/get_usernames", function(req, res) {
  // send response
  res.statusCode = statusOK;
  res.set(headers);
  database.get_usernames(function(err, userArray) {
    res.send(userArray);
  });
});

app.post("/user_kalas_array", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.get_kalas_info(data.username, function(err, kalasArray) {
    res.send(kalasArray);
  });
});

app.post("/add_user", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.add_user(data.username, data.password, data.birthyear, data.name);
});

app.post("/delete_user", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.delete_user(data.username);
});

app.post("/delete_kalas_on_username", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.delete_kalas(data.username);
});

app.post("/delete_kalas_on_kalasID", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.delete_kalasID(data.kalasID);
});

app.post("/check_login_admin", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.check_login_admin(data.username, data.password, function(
    err,
    isValidLogin
  ) {
    res.send(isValidLogin);
  });
});

app.post("/check_login_user", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.check_login_user(data.username, data.password, function(
    err,
    isValidLogin
  ) {
    res.send(isValidLogin);
  });
});

app.post("/add_kalas", function(req, res) {
  // send response
  var data = req.body;
  console.log(data);
  res.statusCode = statusOK;
  res.set(headers);
  if (data.host) {
    database.add_kalas_host(
      data.numberOfPersons,
      data.startTime,
      data.endTime,
      data.address,
      data.capacity,
      data.title,
      data.description,
      data.username,
      data.phoneNumber
    );
  } else {
    database.add_kalas_seeker(
      data.numberOfPersons,
      data.title,
      data.description,
      data.username
    );
  }
});

app.post("/update_kalas", function(req, res) {
  // send response
  var data = req.body;
  res.statusCode = statusOK;
  res.set(headers);
  database.update_kalas(
    data.numberOfPersons,
    data.startTime,
    data.endTime,
    data.address,
    data.capacity,
    data.title,
    data.description,
    data.phoneNumber,
    data.host,
    data.kalasID
    );
});

app.listen(port, hostname, function() {
  console.log(`Listening at http://${hostname}:${port}/`);
});
