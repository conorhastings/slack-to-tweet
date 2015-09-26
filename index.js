var http = require('http');
var middler = require('middler');
var Twitter = require('twitter');

var server = http.createServer();

var twitter = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

middler(server, function (req, res, next) {
	var data = '';
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.once('end', function () {
		console.log(data);
		if(data && data.length) {
			var parsedData = data.split('=');
			var fromUser = parsedData[9].split('&')[0];
			var message = parsedData[10];
			var parsedMessage = parseMessage(message);
			var tweet = 'From: ' + fromUser + ' ==> ' + parsedMessage;
			twitter.post('statuses/update', {status: tweet}, function(err, myTweet, response){
				console.log(response);
			});
		}
		res.writeHead(200);
		res.end();
	});
});


function parseMessage(message) {
	message = decodeURIComponent(message);
	message = message.split('http');
	if(message[1]) {
		message[1] = 'http' + message[1];
	}
	message[0] = message[0].split('+').join(' ');
	message = message.join(' ');
	return message;
}
server.listen(process.env.PORT || 4000);
