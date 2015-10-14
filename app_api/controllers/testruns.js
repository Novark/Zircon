/**
 * Created by Jeff on 10/13/2015
 */

var mongoose = require("mongoose");
var trModel = mongoose.model("Testrun");

var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/* GET test runs list */
module.exports.testrunsList = function(req, res) {
    console.log("TRLIST");
    sendJSONResponse(res, 200, {"status": "success"});
};

/* GET test run */
module.exports.testrunRead = function(req, res) {
    if (req.params && req.params.testrunID) {
        trModel.findById(req.params.testrunID).exec(
            function(err, testrun) {
                if (!testrun) {
                    sendJSONResponse(res, 404, {
                        "message": "testrun not found"
                    });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 200, testrun);
            }
        );
    } else {
        sendJSONResponse(res, 404, {
            "message": "No testrun in request"
        });
    }
};

/* POST test run */
module.exports.testrunCreate = function(req, res) {
    console.log("TRREAD");
};

/* PUT test run */
module.exports.testrunUpdate = function(req, res) {
    console.log("TRPUT");
};

/* DELETE test run */
module.exports.testrunDelete = function(req, res) {
    console.log("TRDELETE");
};

