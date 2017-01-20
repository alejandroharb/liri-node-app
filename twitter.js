//gathering NPM package
var twitter = require('twitter');

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

//parameters for twitter API
var params = {
	screen_name: '@alejandroharb',
	count: 10,
};


//twitter NPM api function
function NewTwitter() {
	this.getTweets = function() {
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
}

//exporting NewTwitter constructor, made available to liri.jsd
module.exports = NewTwitter;