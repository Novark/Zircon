/**
 * Created by Jeff on 9/28/2015.
 */

/* GET test runs page */
module.exports.testrunList = function(req, res) {
    res.render('testruns', { title: 'Test Runs' });
};

/* GET summary page */
module.exports.testcaseList = function(req, res) {
    res.render('testcases', { title: 'Test Run #XYZ' });
};

/* GET test results page */
module.exports.testResults = function(req, res) {
    res.render('testresults', { title: 'Test Case' });
};

