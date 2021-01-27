const fs = require("fs")
var path = require("path");
const express = require("express");
const { Console } = require("console");
const { get } = require("http");

var app = express();
var PORT = process.env.PORT || 3000;

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

  //routes created
  app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
	return res.json(notes);
  });

  app.post("/api/notes", function(req,res){
	//grab new note (text and title) that was saved
	var savedNote = req.body
	
	console.log(JSON.stringify(req.body))
	//add new note to temp array
	notes.push(savedNote)
	//run writefile function to634 add to notes array
	createJSON();
})


app.get("/api/notes/:id", function (req, res) {
    // display json for the notes array indices of the provided id
    res.json(notes[req.params.id]);
  });
  // Deletes a note with id
app.delete("/api/notes/:id", function (req, res) {
	
    notes.splice(req.params.id, 1);
	createJSON();
	console.log("Del note with id " + req.params.id);
	});

function createJSON() {
	fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
		if (err) throw err;
		return true
	  });
}

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
  });


  
