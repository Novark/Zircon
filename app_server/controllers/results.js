/**
 * Created by Jeff on 9/28/2015
 */

var request = require("request");

//API options
var apiOptions = {
	"server": "http://192.168.153.144:3000"
};

if (process.env.NODE_ENV === "production") {
	//TODO: Change this for production
	apiOptions.server = "";
}

//Test runs renderer
var renderTestruns = function(req, res, resBody) {
	res.render('testruns', {
		"title": "Test Runs",
		"testrunList": resBody
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

/* GET summary page */
module.exports.testcaseList = function(req, res) {
    res.render('testcases', {title: 'Test Run #XYZ'});
};

/* GET test results page */
module.exports.testResults = function(req, res) {
    res.render('testresults', {title: 'Test Case'});
};




