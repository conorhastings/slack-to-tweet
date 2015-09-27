var parseMessage = function(message) {
	message = decodeURIComponent(message);
	message = message.split('http');
	if(message[1]) {
		message[1] = 'http' + message[1];
	}
	message[0] = message[0].split('+').join(' ');
	message = message.join(' ');
	return message;
}

module.exports = parseMessage;