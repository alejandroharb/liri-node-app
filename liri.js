var request = require('request');
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');
var twitterConsKey = keys.twitterKeys.consumer_key;
var twitterConsSec = keys.twitterKeys.consumer_secret;
var twitterAccKey = keys.twitterKeys.access_token_key;
var twitterAccSec = keys.twitterKeys.access_token_secret;
var client = new twitter({
	consumer_key: twitterConsKey,
	consumer_secret: twitterConsSec,
	access_token_key: twitterAccKey,
	access_token_secret: twitterAccSec
})
var movieName ='';
var queryUrl = "";
var params = {
	screen_name: '@alejandroharb',
	count: 10,
};
var userChoice = process.argv[2];
var entry = [];
process.argv.forEach(function(val,index) {
	entry.push(val);
});
var song = "";

if(userChoice === 'my-tweets') {
	callTwitter();
} else if (userChoice === 'spotify-this-song') {
	song = entry.splice(3).join(' ')
	callSpotify();
} else if (userChoice === 'movie-this') {
	movieName = entry.splice(3).join('+');
	callMovie();
} else if (userChoice === 'do-what-it-says') {
	fs.readFile('random.txt','utf8',function(error,data) {
		var randomChoice = data.split(',');
		userChoice = randomChoice[0];
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


function callTwitter() {
	client.get('statuses/user_timeline', params,function(error,tweets, response) {
		var tweet
		if(error){
			console.log(error)
		}
		if(!error) {
			for(var i = 0; i < tweets.length; i++) {
				console.log("======================");
				console.log("user: " + tweets[i].user.name);
				console.log("Date: " + tweets[i].created_at);
				console.log("Tweet: " + tweets[i].text);
			}
		}
	});
}

function callSpotify() {
	spotify.search({ type: 'track',query: song}, function(err, data) {
		if(err) {
			console.log("Error occurred: " + err);
			return;
		}
		console.log("==========================");
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
		console.log("Song Name: " + data.tracks.items[3].name);
		console.log("Preview Link: " + data.tracks.items[3].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("=========================="); 
		// console.log(JSON.stringify(data,null,2))
	})
}



function callMovie() {
	queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&tomatoes=true&plot=short&r=json";
	request(queryUrl, function(error, response, body) {
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