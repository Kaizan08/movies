const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const mustacheExpress = require('mustache-express');
const Movies = require("./models/Movies");
const app = express();
const port = process.env.PORT || 8000;
const dbURL = "mongodb://localhost:27017/movies";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.engine('mustache', mustacheExpress());
app.set('views', './public');
app.set('view engine', 'mustache');

app.use(bodyParser.json());

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("Connected to MOONGOOSE DB.");
});

app.get("/", (req, res) =>{
  Movies.find()
    .then(foundMovie => {
      res.render("movies", {data:foundMovie} );
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

app.post("/", (req, res) => {
  let movie = req.body;
  let newMovie = new Movies(movie);
  newMovie
    .save()
    .then(savedMovie => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/addmovie", (req, res)=>{
  res.render("addmovie");
})

app.post("/addmovie", (req, res)=>{
  console.log(req.body);
  var obj = req.body;

  obj.actors = req.body.actors.split(',')
  console.log(obj);
})
// app.get("/arrowheads/:id", (req, res) => {
//   Arrowhead.findById(req.params.id)
//     .then(foundArrowhead => {
//       console.log("YEAR MADE: ", foundArrowhead.yearMade);
//       foundArrowhead.shoot();
//       res.send(foundArrowhead);
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// app.post("/arrowheads", (req, res) => {
//   let arrowheadData = req.body;
//   let newArrowhead = new Arrowhead(arrowheadData);
//   console.log("newArrowhead: ", newArrowhead);
//   newArrowhead
//     .save()
//     .then(savedArrowhead => {
//       res.send(savedArrowhead);
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// app.put("/arrowheads/:id", (req, res) => {
//   Arrowhead.updateOne({ _id: req.params.id }, req.body)
//     .then(updatedArrowhead => {
//       res.send(updatedArrowhead);
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// app.delete("/arrowheads/:id", (req, res) => {
//   Arrowhead.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.send("Deleted record");
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });



app.listen(port,()=>{
    console.log('Server running on port', port);
})
