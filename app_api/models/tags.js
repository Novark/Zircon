/**
 * Created by Jeff on 10/16/2015
 */

var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema({
	"datetime": {"type": Date, "required": true},
	"sequencenumber": {"type": Number, "required": true},
	"testcaseid": {"type": String, "required": true, "default": "ZIRCON_DEFAULT_TEST_CASE_ID"},
	"tagtype": {"type": String, "required": true},
	"tagdata": {"type": mongoose.Schema.Types.Mixed},
});

mongoose.model("Tag", tagSchema, "tags");




