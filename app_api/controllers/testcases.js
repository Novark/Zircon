/**
 * Created by Jeff on 10/13/2015
 */

var mongoose = require("mongoose");
var tcModel = mongoose.model("Testcase");

var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/* GET test cases list */
module.exports.testcasesList = function(req, res) {
	console.log("ROUTE: testcasesList");
    tcModel.find().sort({"datetime": "desc"}).exec(
        function(err, testruns) {
            if (!testruns) {
                sendJSONResponse(res, 404, {
                    "message": "no test cases found"
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

/* GET test case */
module.exports.testcaseRead = function(req, res) {
	console.log("ROUTE: testcaseRead");
	tcID = req.params.testcaseID;
    tcModel.find({
        "_id": tcID
    }).exec(
        function(err, testcase) {
            if (!testcase) {
                sendJSONResponse(res, 404, {
                    "message": "test case not found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 404, err);
                return;
            }
            sendJSONResponse(res, 200, testcase);
        }
    );
};

/* GET test cases from parent test run */
module.exports.testcasesFromTestRunRead = function(req, res) {
	console.log("ROUTE: testcasesFromTestRunRead");
	testrunID = req.params.testrunID;
    tcModel.find({
        "testrunid": testrunID
    }).sort({"datetime": "desc"}).exec(
        function(err, testcases) {
            if (!testcases) {
                sendJSONResponse(res, 404, {
                    "message": "no test cases found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 404, err);
                return;
            }
            testcases.testrunid = testrunID;
            sendJSONResponse(res, 200, testcases);
        }
    );
};

/* POST test case */
module.exports.testcaseCreate = function(req, res) {
	console.log("ROUTE: testcaseCreate");
    tcModel.create({
		"datetime": req.body.datetime,
		"testrunid": req.body.testrunid,
		"subsystem": req.body.subsystem,
		"testplan": req.body.testplan,
		"testcase": req.body.testcase,
		"pass": req.body.pass,
		"fail": req.body.fail,
		"skip": req.body.skip,
		"crash": req.body.crash
    }, function(err, testcase) {
        if (err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, testcase);
        }
    });
};

/* PUT test case */
module.exports.testcaseUpdate = function(req, res) {
    console.log("ROUTE: testcaseUpdate");
    testcaseID = req.params.testcaseID;
    if (testcaseID) {
        tcModel.findById(testcaseID).exec(
            function(err, testcase) {
                testcase.pass = req.body.pass;
                testcase.fail = req.body.fail;
                testcase.skip = req.body.skip;
                testcase.crash = req.body.crash;
                testcase.elapsed = req.body.elapsed;
                testcase.save(function(err, testcase) {
                    if (err) {
                        sendJSONResponse(res, 404, err);
                    } else {
                        sendJSONResponse(res, 200, testcase);
                    }
                });
            }
        );
    }
};

/* DELETE test case */
module.exports.testcaseDelete = function(req, res) {
    console.log("TCDELETE");
    testcaseID = req.params.testcaseID;
    if (testcaseID) {
        tcModel.findByIdAndRemove(testcaseID).exec(
            function(err, testcase) {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            }
        );
    } else {
        sendJSONResponse(res, 404, {
            "message": "no testcase"
        });
    }
};







