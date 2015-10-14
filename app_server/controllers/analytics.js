/**
 * Created by Jeff on 9/28/2015.
 */
 
/* GET analytics pages */
module.exports.analyticsDash = function(req, res) {
    res.render('analytics', { title: 'Analytics' });
};
