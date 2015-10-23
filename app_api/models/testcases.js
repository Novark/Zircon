/**
 * Created by Jeff on 10/15/2015
 */

var mongoose = require("mongoose");

var testcaseSchema = new mongoose.Schema({
	"datetime": {"type": Date, "required": true},
	"testrunid": {"type": String, "required": true},
	"subsystem": {"type": String, "default": "ZIRCON_DEFAULT_SUBSYSTEM"},
	"testplan": {"type": String, "default": "ZIRCON_DEFAULT_TEST_PLAN"},
	"testcase": {"type": String, "default": "ZIRCON_DEFAULT_TEST_CASE"},
	"pass": {"type": Number, "min": 0, "default": 0},
	"fail": {"type": Number, "min": 0, "default": 0},
	"skip": {"type": Number, "min": 0, "default": 0},
	"crash": {"type": Number, "min": 0, "default": 0},
	"elapsed": {"type": Number, "default": 0}
});

mongoose.model("Testcase", testcaseSchema, "testcases");
