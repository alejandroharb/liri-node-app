
//collect NPM package
var spotify = require('spotify');

//stores command line inputs
var entry = [];

//loops through all command line inputs, and pushes all into new array
process.argv.forEach(function(val,index) {
	entry.push(val);
});
song = entry.splice(3).join(' ')//deletes array elements prior to position 4 and joins elements with a space.


//function runs spotify npm API function
function SearchSpotify(song) {
	this.song = song;
	//searches via tracks
	this.SearchTrack = function(song) {
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
}

module.exports = SearchSpotify;