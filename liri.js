var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var twitterConsKey = keys.twitterKeys.consumer_key;
var twitterConsSec = keys.twitterKeys.consumer_secret;
var twitterAccKey = keys.twitterKeys.access_token_key;
var twitterAccSec = keys.twitterKeys.access_token_secret;
function readTwitter() {
    fs.readFile(keys.js, 'utf8',function(error, data) {


    });
}
// readTwitter();
console.log(consumer_key);