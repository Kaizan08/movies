var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    releaseYr: {
        type: Number,
        required: true
    },
    filmLocation: {
        country: {
            type: String
        },
        state_province: {
            type: String
        }
    },
    actors: [String]
});

var film = mongoose.model("Movie", movieSchema);
module.exports = film;



