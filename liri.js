// assigning NPM packages and importing files
var fs = require('fs');
var twitter = require('./twitter.js');
var spotify = require('./spotify.js');
var movie = require('./movie.js')

//declaring global variables
var queryUrl = "";
var song = "";

//detecting the function user enters (third positio in command line)
var userChoice = process.argv[2];
var entry = [];
//loops through all command line inputs, and pushes all into new array
process.argv.forEach(function(val,index) {
	entry.push(val);
});

//assigning objects created from constructors imported from different files
var tweet = new twitter;
var songSearch = new spotify;
var movieSearch = new movie;

//conditionals determine what command user chose
if(userChoice === 'my-tweets') {
	//run twitter feed API method on NewTitter constructor
	tweet.getTweets();
} else if (userChoice === 'spotify-this-song') {
	//run spotify method from SearchMovie constructor
	songSearch.SearchTrack();
} else if (userChoice === 'movie-this') {
	//run movie function for API
	movieSearch.searchMovie();
} else if (userChoice === 'do-what-it-says') {
	//if user chooses random command, read random.txt file, with utf8 format parameter
	fs.readFile('random.txt','utf8',function(error,data) {
		//create array of elements between the comma in the text string
		var randomChoice = data.split(',');
		//assign userChoice as the first element of array
		userChoice = randomChoice[0];
		//detect which liri command userChoice was. Run appropriate function as before
		switch(userChoice) {
			case 'my-tweets':
				return tweet.getTweets();;
			case 'spotify-this-song':
				song = randomChoice[1];
				return songSearch.SearchTrack();
			case 'movie-this':
				movieName = randomChoice[1];
				return movieSearch.searchMovie();
			default:
				return console.log("Oops! Looks like nothing was picked. Try again!")
		}
	})
} else {
	console.log("Uh oh! looks like nothing was asked for, OR you asked for something I can't do! \n Please try again.")
}



