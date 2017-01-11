// assigning NPM packages
var request = require('request');
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
// calling on folder for twitter api keys
var keys = require('./keys.js');
var twitterConsKey = keys.twitterKeys.consumer_key;
var twitterConsSec = keys.twitterKeys.consumer_secret;
var twitterAccKey = keys.twitterKeys.access_token_key;
var twitterAccSec = keys.twitterKeys.access_token_secret;
//twitter NPM constructor
var client = new twitter({
	consumer_key: twitterConsKey,
	consumer_secret: twitterConsSec,
	access_token_key: twitterAccKey,
	access_token_secret: twitterAccSec
})
//declaring global variables
var movieName ='';
var queryUrl = "";
var song = "";
//parameters for twitter API
var params = {
	screen_name: '@alejandroharb',
	count: 10,
};
//detecting the function user enters (third positio in command line)
var userChoice = process.argv[2];
var entry = [];
//loops through all command line inputs, and pushes all into new array
process.argv.forEach(function(val,index) {
	entry.push(val);
});

//conditionals determine what command user chose
if(userChoice === 'my-tweets') {
	//run twitter feed API
	callTwitter();
} else if (userChoice === 'spotify-this-song') {
	//assign song variable from user's input in command line, starting from 4 position (contents gathered from entry array made in line 33)
	song = entry.splice(3).join(' ')//deletes array elements prior to position 4 and joins elements with a space.
	//run spotify function
	callSpotify();
} else if (userChoice === 'movie-this') {
	//assign movie name variable from user's input
	movieName = entry.splice(3).join('+'); //join with a plus sign because it's passed into API URL
	//run movie function for API
	callMovie();
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
				return callTwitter();
			case 'spotify-this-song':
				song = randomChoice[1];
				return callSpotify();
			case 'movie-this':
				movieName = randomChoice[1];
				return callMovie();
			default:
				return console.log("Oops! Looks like nothing was picked. Try again!")
		}
	})
} else {
	console.log("Uh oh! looks like nothing was asked for, OR you asked for something I can't do! \n Please try again.")
}

//twitter NPM api function
function callTwitter() {
	//npm function handler. parameters set as variable params
	//returns 20 tweets from user timeline
	//currently set for only @alejandroharb 's twitter
	client.get('statuses/user_timeline', params,function(error,tweets, response) {
		//if error occurs, console log it
		if(error){
			console.log(error)
		}
		//if no error
		if(!error) {
			// loop through array of data received, and log specific contents for user
			for(var i = 0; i < tweets.length; i++) {
				console.log("======================");
				console.log("user: " + tweets[i].user.name);
				console.log("Date: " + tweets[i].created_at);
				console.log("Tweet: " + tweets[i].text);
			}
		}
	});
}
//function runs spotify npm API function
function callSpotify() {
	//searches via tracks
	//song gathered from global song variable, assigned from user's command
	spotify.search({ type: 'track',query: song}, function(err, data) {
		if(err) {
			//console log any erros
			console.log("Error occurred: " + err);
			return;
		}
		//logs all specific data for user's desired song
		console.log("==========================");
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
		console.log("Song Name: " + data.tracks.items[3].name);
		console.log("Preview Link: " + data.tracks.items[3].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("=========================="); 
	})
}
// movie function runs OMDB API call
function callMovie() {
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