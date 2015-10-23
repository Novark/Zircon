var express = require("express");
var router = express.Router();
var ctrlTestruns = require("../controllers/testruns");
var ctrlTestcases = require("../controllers/testcases");
var ctrlTags = require("../controllers/tags");

/* Testrun operations */
router.get("/testruns", ctrlTestruns.testrunsList);
router.get("/testruns/:testrunID", ctrlTestruns.testrunRead);
router.post("/testruns", ctrlTestruns.testrunCreate);
router.put("/testruns/:testrunID", ctrlTestruns.testrunUpdate);
router.delete("/testruns/:testrunID", ctrlTestruns.testrunDelete);

/* Testcase operations */
router.get("/testcases", ctrlTestcases.testcasesList);
router.get("/testcases/:testcaseID", ctrlTestcases.testcaseRead);
router.get("/testruns/:testrunID/testcases", ctrlTestcases.testcasesFromTestRunRead);
router.post("/testcases", ctrlTestcases.testcaseCreate);
router.put("/testcases/:testcaseID", ctrlTestcases.testcaseUpdate);
router.delete("/testcases/:testcaseID", ctrlTestcases.testcaseDelete);

/* Tag operations */
router.get("/tags", ctrlTags.tagsList);
router.get("/tags/:tagID", ctrlTags.tagRead);
router.get("/testcases/:testcaseID/tags", ctrlTags.tagsFromTestCaseRead);
router.post("/tags", ctrlTags.tagCreate);
router.post("/tags/batch", ctrlTags.tagCreateBatch);
router.put("/tags/:tagID", ctrlTags.tagUpdate);
router.delete("/tags/:tagID", ctrlTags.tagDelete);

module.exports = router;




