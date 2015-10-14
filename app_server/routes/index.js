var express = require("express");
var router = express.Router();
var ctrlMain = require("../controllers/main");
var ctrlResults = require("../controllers/results");
var ctrlAnalytics = require("../controllers/analytics");

/* GET home page */
router.get("/", ctrlMain.index);

/* GET results pages */
router.get("/results", ctrlResults.testrunList);
router.get("/results/testruns/:testrunID", ctrlResults.testcaseList);
router.get("/results/testcases/:testcaseID", ctrlResults.testResults);

/* GET analytics pages */
router.get("/analytics", ctrlAnalytics.analyticsDash);

module.exports = router;

