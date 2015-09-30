var http = require('http');
var middler = require('middler');
var Twitter = require('twitter');
var parseMessage = require("./parse-message");
slackToTweetServer = function(opts) {
	var server = http.createServer();
	var twitter = new Twitter({
		consumer_key: opts.twitterConsumerKey,
		consumer_secret: opts.twitterConsumerSecret,
		access_token_key: opts.twitterAccessTokenKey,
		access_token_secret: opts.twitterAccessTokenSecret
	});
	var formatMessage = opts.formatMessage;
	var shouldTweet = opts.shouldTweet || function(){return true};
	if(!formatMessage) {
		formatMessage = function(user, message) {
			return 'From: ' + user + ' ==> ' + message;
		}
	}
	//TODO take a defined route as option for slack to post to
	middler(server, function (req, res, next) {
		var data = '';
		req.on('data', function (chunk) {
			data += chunk;
		});
		req.once('end', function () {
			if(data && data.length) {
				var parsedData = data.split('=');
				var fromUser = parsedData[9].split('&')[0];
				if(opts.userMap) {
					fromUser = opts.userMap[fromUser] || fromUser;
				}
				var message = parsedData[10];
				//TODO allow user to pass in there own parse message function, not everyone cares about http processing
				var parsedMessage = parseMessage(message);
				if(shouldTweet(fromUser, parsedMessage)) {
					var tweet = formatMessage(fromUser, parsedMessage);
					twitter.post('statuses/update', {status: tweet}, function(err, myTweet, response){
						//TODO, handle errors and stuff
						console.log(response);
					});
				}
				
			}
			//TODO don't just always return a 200
			res.writeHead(200);
			res.end();
		});
	});

	return server;
}

module.exports = slackToTweetServer;
