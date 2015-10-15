/**
 * Created by Jeff on 10/8/2015
 */

var mongoose = require("mongoose");

var testrunSchema = new mongoose.Schema({
	"datetime": {"type": Date, "required": true},
	"user": {"type": String, "default": "ZIRCON_DEFAULT_USER"},
	"source": {"type": String, "default": "0.0.0.0"},
	"name": {"type": String, "default": "ZIRCON_DEFAULT_TEST_RUN"},
	"pass": {"type": Number, "min": 0, "default": 0},
	"fail": {"type": Number, "min": 0, "default": 0},
	"skip": {"type": Number, "min": 0, "default": 0},
	"crash": {"type": Number, "min": 0, "default": 0}
});

mongoose.model("Testrun", testrunSchema, "testruns");

