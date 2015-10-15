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
    currentDate = new Date();
    oneMonthAgo = currentDate.setMonth(currentDate.getMonth() - 2);
    console.log(oneMonthAgo);
    trModel.find({
        "datetime": {"$gte": oneMonthAgo}
    }).sort({"datetime": "desc"}).exec(
        function(err, testruns) {
            if (!testruns) {
                sendJSONResponse(res, 404, {
                    "message": "no testruns found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 404, err);
                return;
            }
            sendJSONResponse(res, 200, testruns);
        }
    );
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
    trModel.create({
        "datetime": req.body.datetime,
        "user": req.body.user,
        "source": req.body.source,
        "name": req.body.name,
        "pass": req.body.pass,
        "fail": req.body.fail,
        "skip": req.body.skip,
        "crash": req.body.crash
    }, function(err, testrun) {
        if (err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, testrun);
        }
    });
};

/* PUT test run */
module.exports.testrunUpdate = function(req, res) {
    console.log("TRPUT");
};

/* DELETE test run */
module.exports.testrunDelete = function(req, res) {
    testrunID = req.params.testrunID;
    if (testrunID) {
        trModel.findByIdAndRemove(testrunID).exec(
            function(err, testrun) {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            }
        );
    } else {
        sendJSONResponse(res, 404, {
            "message": "no testrun"
        });
    }
};

