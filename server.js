var slackToTweet = require("./index.js");
var slackToTweetSettings = {
	twitterConsumerKey: process.env.CONSUMER_KEY,
	twitterConsumerSecret: process.env.CONSUMER_SECRET,
	twitterAccessTokenKey: process.env.ACCESS_TOKEN,
	twitterAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET
};
var slackToTweetServer = slackToTweet(slackToTweetSettings).listen(process.env.PORT || 4000);