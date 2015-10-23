/**
 * Created by Jeff on 10/8/2015
 */

var mongoose = require("mongoose");
//var dbURI = "mongodb://192.168.153.142:27017/zircon";
var dbURI = "mongodb://127.0.0.1:27017/zircon";
var gracefulShutdown;

if (process.env.NODE_ENV === "production") {
	dbURI = "mongodb://10.2.2.117:27017/zircon"; //Handle production DB URI
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log("Mongoose connected to: " + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log("Mongoose connection error: " + err);
});

mongoose.connection.on('disconnected', function() {
	console.log("Mongoose disconnected from: " + dbURI);
});

//Shutdown handler
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through " + msg);
		callback();
	});
};

//nodemon kill signal
process.once("SIGUSR2", function() {
	gracefulShutdown("nodemon restart", function() {
		process.kill(process.pid, "SIGUSR2");
	});
});

//app kill signal
process.once("SIGINT", function() {
	gracefulShutdown("app termination", function() {
		process.kill(process.pid, "SIGINT");
	});
});

//NOTE: may also need a Windows kill signal, depending on deployment

//Require the API models
require("./testruns");
require("./testcases");
require("./tags");
