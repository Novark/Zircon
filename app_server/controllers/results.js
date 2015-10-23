/**
 * Created by Jeff on 9/28/2015
 */

var request = require("request");

//API options
var apiOptions = {
	//"server": "http://192.168.153.144:3000"
	"server": "http://127.0.0.1:3000"
};

if (process.env.NODE_ENV === "production") {
	//TODO: Change this for production
	apiOptions.server = "http://127.0.0.1:3000";
}

//Test runs renderer
var renderTestruns = function(req, res, resBody) {
	var message;
	if (!(resBody instanceof Array)) {
		message = "API lookup error";
		resBody = [];
	} else {
		if (resBody.length === 0) {
			message = "No test runs were found";
		}
	}
	res.render('testruns', {
		"title": "Test Runs",
		"testrunList": resBody,
		"message": message
	});
};

//Test cases renderer
var renderTestcases = function(req, res, resBody) {
	var message;
	if (!(resBody instanceof Array)) {
		message = "API lookup error";
		resBody = [];
	} else {
		if (resBody.length === 0) {
			message = "No test cases were found";
		}
	}
	res.render('testcases', {
		"title": "Test Cases",
		"testcaseList": resBody,
		"message": message
	});
};

//Test results renderer
var renderResults = function(req, res, resBody) {
	var message;
	if (!(resBody instanceof Array)) {
		message = "API lookup error";
		resBody = [];
	} else {
		if (resBody.length === 0) {
			message = "No tags were found for this test case";
		}
	}
	res.render('testresults', {
		"title": "Test Results",
		"tagList": resBody,
		"message": message
	});
};

/* GET test runs page */
module.exports.testrunList = function(req, res) {
	var requestOptions, path;
	path = '/api/testruns/';
	requestOptions = {
		"url": apiOptions.server + path,
		"method": "GET",
		"json": {}
	};
	request(requestOptions, function(err, response, body) {
		renderTestruns(req, res, body);
	});
};

/* GET test cases page */
module.exports.testcaseList = function(req, res) {
	var requestOptions, path;
	testrunID = req.params.testrunID;
	path = '/api/testruns/' + testrunID + '/testcases';
	requestOptions = {
		"url": apiOptions.server + path,
		"method": "GET",
		"json": {}
	};
	console.log(requestOptions);
	request(requestOptions, function(err, response, body) {
		renderTestcases(req, res, body);
	});
};

/* GET test results page */
module.exports.testResults = function(req, res) {
	var requestOptions, path;
	testcaseID = req.params.testcaseID;
	path = '/api/testcases/' + testcaseID + '/tags';
	requestOptions = {
		"url": apiOptions.server + path,
		"method": "GET",
		"json": {}
	};
	console.log(requestOptions);
	request(requestOptions, function(err, response, body) {
		renderResults(req, res, body);
	});
};



