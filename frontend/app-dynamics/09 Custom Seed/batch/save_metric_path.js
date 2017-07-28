
const splitPattern = '%7C';
const smd = require('./store_metrics');


exports.handleMetricPath = function(pool, obj) {


  //  for(var i=0; i<metricPath.length; i++) {
     //   const obj = metricPath[i];
        const applicationName = obj.name;
        const metricPaths = obj.metricPaths;
        const brokenUrl = metricPaths.split(splitPattern);
        //smd.saveData(mCache, brokenUrl, applicationName);
        return smd.storeData(pool, applicationName, brokenUrl);

 //   }


}





