# Slack To Tweet

An npm module that returns a simple server that will post from a slack channel to twitter.

### Install

`npm i slack-to-tweet`

### Use

Set up an outgoing webhook for the slack channel you would like to connect to twitter. In twitter set up an application, and acquire the keys for that application. Implement the code below and deploy the server (heroku deployment  is very easy). The `formatMessage` function allows you to contorl the output of the message. Currently messages over 140 characters will not be posted.


```js
	var slackToTweet = require("slack-to-tweet");
	var slackToTweetSettings = {
		twitterConsumerKey: process.env.CONSUMER_KEY,
		twitterConsumerSecret: process.env.CONSUMER_SECRET,
		twitterAccessTokenKey: process.env.ACCESS_TOKEN,
		twitterAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
		formatMessage: function(user, message){
			return "From " + user + ": " + message;
		}
	};
	var slackToTweetServer = slackToTweet(slackToTweetSettings).listen(process.env.PORT || 4000);
```
