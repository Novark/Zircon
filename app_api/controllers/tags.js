/**
 * Created by Jeff on 10/13/2015
 */

var mongoose = require("mongoose");
var tagModel = mongoose.model("Tag");

var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/* GET tag list */
module.exports.tagsList = function(req, res) {
	console.log("ROUTE: tagsList");
    tagModel.find().sort({"datetime": "desc"}).exec(
        function(err, tags) {
            if (!tags) {
                sendJSONResponse(res, 404, {
                    "message": "no tags found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 404, err);
                return;
            }
            sendJSONResponse(res, 200, tags);
        }
    );
};

/* GET tag */
module.exports.tagRead = function(req, res) {
	console.log("ROUTE: tagRead");
	tagID = req.params.tagID;
    tagModel.find({
        "_id": tagID
    }).exec(
        function(err, tag) {
            if (!tag) {
                sendJSONResponse(res, 404, {
                    "message": "tag not found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 404, err);
                return;
            }
            sendJSONResponse(res, 200, tag);
        }
    );
};

/* GET tags from parent test case */
module.exports.tagsFromTestCaseRead = function(req, res) {
    console.log("ROUTE: tagsFromTestCaseRead");
    testcaseID = req.params.testcaseID;
    tagModel.find({
        "testcaseid": testcaseID
    }).sort({"sequencenumber": "asc"}).exec(
        function(err, tags) {
            if (!tags) {
                sendJSONResponse(res, 404, {
                    "message": "no tags found"
                });
                return;
            } else if (err) {
                sendJSONResponse(res, 404, err);
                return;
            }
            sendJSONResponse(res, 200, tags);
        }
    );
};

/* POST tag */
module.exports.tagCreate = function(req, res) {
	console.log("ROUTE: tagCreate");
    tagModel.create({
		"datetime": req.body.datetime,
		"testcaseid": req.body.testcaseid,
		"sequencenumber": req.body.sequencenumber,
		"tagtype": req.body.tagtype,
		"tagdata": req.body.tagdata
    }, function(err, tag) {
        if (err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, tag);
        }
    });
};

/* POST tag (batch) */
module.exports.tagCreateBatch = function(req, res) {
	console.log("ROUTE: tagCreateBatch");

    tagModel.collection.insert(req.body, function(err, tag) {
        if (err) {
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, tag);
        }
    });
};


/* PUT tag */
module.exports.tagUpdate = function(req, res) {
    console.log("TAGPUT");
};

/* DELETE tag */
module.exports.tagDelete = function(req, res) {
    console.log("TAGDELETE");
};
