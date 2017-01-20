//NPM package for API request
var request = require('request');

//holds command line inputs
var entry = [];
//loops through all command line inputs, and pushes all into new array
process.argv.forEach(function(val,index) {
	entry.push(val);
});

//assign movie name variable from user's input
var movieName = '';

//movie constructor
var MovieSearch = function() {
	// movie function runs OMDB API call
	this.searchMovie = function() {
		movieName = entry.splice(3).join('+'); //join with a plus sign because it's passed into API URL
		console.log("movieName: " + movieName)
		//sets query url with assigned movieName
		queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&tomatoes=true&plot=short&r=json";
		//request NPM function, calls API
		request(queryUrl, function(error, response, body) {
			//if no errors, console specific data
			if(!error && response.statusCode === 200) {
				console.log("=========================================");
				console.log("Movie Title: " + JSON.parse(body).Year);
				console.log("Released on: " + JSON.parse(body).Released);
				console.log("IMDB rating: " + JSON.parse(body).imdbRating);
				console.log("Country Produced: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
				console.log("Rotten Tomatoes url: " + JSON.parse(body).tomatoURL);
				console.log("=========================================");
			}
		})
	}
}
	
//exports MovieSearch constructor, made available in liri.js
module.exports = MovieSearch;