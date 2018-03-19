var request = require('request-promise')
var express = require('express')
var app = express()
var key = require('./apikey.js');

/* Routes */

app.use(express.static('public'))

app.get('/', function (req, res){ 
	res.sendFile(__dirname + '/public/index.html');
})

app.get('/stats', (req, res) => {

	var playerone = req.query.playerone;
	var playertwo = req.query.playertwo;
	var playerthree = req.query.playerthree;
	var playerfour = req.query.playerfour;

	var players = [];

	if(playerone != undefined && playerone != "")
		players.push(playerone);
	if(playertwo != undefined && playertwo != "")
		players.push(playertwo);
	if(playerthree != undefined && playerthree != "")
		players.push(playerthree);
	if(playerfour != undefined && playerfour != "")
		players.push(playerfour);

	const results = getResults(players, function(data){
		res.send(data);
	});
})

app.listen(3000,() => {
	console.log('\n--------------------------');
	console.log('Listening @ localhost:3000');
	console.log('--------------------------\n');
});

/* Functions */

function getResults(players, callback){

	var results = "";

	for(i = 0; i < players.length; i++) { 
		
		var player = players[i];

		setTimeout(function(i){

			getPlayer(player, function(data){

				build(data);

				if(players.length - 1 == i)
					return callback(results);
			}); 

		}.bind(this, i), 2000 * i);	 

	}

	function build(data){
		results += data;
	}

	function getPlayer(player, playercallback){

		var urlplayer = "https://api.pubgtracker.com/v2/profile/pc/" + player;

		const options = {
		  method: 'GET',
		  uri: urlplayer,
		  headers: {
		    'TRN-Api-Key': key.APIKEY
		  }
		}

		request(options)
		.then(function(response){
			return playercallback(response);
		})
		.catch(function(err){
			return playercallback(err);
		})
	}
}