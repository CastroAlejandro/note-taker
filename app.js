const fs = require("fs")
var path = require("path");
const express = require("express");
const { Console } = require("console");
const { get } = require("http");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

var notes = []


fs.readFile("./db/db.json", "utf8", (err, data) => {
	if (err) throw err;
	// allows data to be read moar pretti 
	notes = JSON.parse(data);
	console.log(notes)
  });



app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
  });


  
