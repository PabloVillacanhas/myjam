const io = server => {
	let io = require('socket.io')(server);
	io.on("connection", function (socket) {
		console.log("A user connected");
		socket.on('join', session => {
			console.log('session', `req to join session ${session}`)
			socket.join(session)
		});
		socket.emit('messages', [{
			author: "Carlos",
			text: "Hola! que tal?"
		}]);

		socket.on("disconnect", () => {
			console.log("Client disconnected");
			clearInterval(1000);
		});
	});
}

var Socket = {
	emit: function (event, data) {
		console.log(event, data);
		io.emit(event, data);
	}
};

exports.io = io
exports.Socket = Socket