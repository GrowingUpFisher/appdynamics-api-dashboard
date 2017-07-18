
const splitPattern = '%7C';
const smd = require('./store_metric_data');
var mCache = {};
const async = require('async');
exports.handleMetricPath = function(metricPath) {


    // async.eachSeries(metricPath, function(path) {
    //     smd.storeAppMetricPath(mCache,path.split(splitPattern));
    // });


    for(var i=0; i<metricPath.length; i++) {
        const brokenUrl = metricPath[i].split(splitPattern);
        console.log()
        smd.storeAppMetricPath(mCache, brokenUrl);

    }


}





