/**
 * Created by dkandpal on 7/13/17.
 */
var limit = require("simple-rate-limiter");
const request = limit(require("request")).to(1).per(10);
const async = require('async');
const saveMetrics = require('./save_metric_path');
const store_metric_data = require('./store_metric_data');
const BASE_URL = 'https://hermes.saas.appdynamics.com/controller/rest/applications/aacd_prd_POD30/metrics';
var mCache = {};

const appDynamicsProp = {
    username : 'dkandpal@hermes',
    password : 'appd123!'
}
const pattern1 = 'metric-path=';

const mysql = require('mysql');
const sqlProp = {
    connectionLimit : 100,
    host : 'localhost',
    'user' : 'root',
    'password' : '',
    database : 'app_dynamics_metrics'
};
const pool = mysql.createPool(sqlProp);

function getCleanUrl(name) {
    const folderName = name.replace(new RegExp("%", 'g'), "%25")
        .replace(new RegExp('\"', 'g'), "%22")
        .replace(new RegExp(' ', 'g'), "%20")
        .replace(new RegExp('[|]', 'g'), "%7C")
        .replace(new RegExp(/[(]/, 'g'), "%28")
        .replace(new RegExp(/[)]/, 'g'), "%29");
    return folderName;
}


function asyncGetUrls(url, currentLevel) {
    return new Promise(function(resolve, reject){
        var outType = '';
        if(currentLevel === 1) {
            outType = '?output=JSON';
        } else {
            outType = '&output=JSON';
        }
        const finalUrl = url + outType;
        const options = getOptionalParameters([appDynamicsProp.username, appDynamicsProp.password], 'GET', finalUrl);
        request(options, function (err, backendResponse, body) {
                try {
                    resolve(JSON.parse(body));
                } catch(ex) {
                    console.error("URL failed, Retrying now : " + finalUrl);
                    reject(ex);
                }
        });

    });
}
var counter = 1;

function crawlAppd(url, cl, list) {
    var currentLevel = cl;
    return asyncGetUrls(url, currentLevel).then(function(parsedBody) {

        const newLevel = cl + 1;

            for (var obj in parsedBody) {
                const currentObj = parsedBody[obj];
                if (currentObj.type === "folder") {
                    const name = currentObj.name;
                    const folderName = getCleanUrl(name);
                    if((currentLevel ===1 && folderName === 'Overall%20Application%20Performance') || currentLevel > 1) {
                        var newUrl = '';
                        if (cl === 1)
                            newUrl = url + "?metric-path=" + folderName;

                        else
                            newUrl = url + "%7C" + folderName;
                        crawlAppd(newUrl, newLevel, list);
                    }
                } else {
                    const tempUrl = url + "%7C" + getCleanUrl(currentObj.name);

                    checkInstrumentedUrl(tempUrl).then(function(instrumentedResponse) {

                        if(instrumentedResponse[0].metricName !== 'METRIC DATA NOT FOUND') {
                            const newTempUrl = tempUrl.split(pattern1)[1];
                            console.log('added : ' + counter);
                            console.log('added : ' + JSON.stringify(instrumentedResponse));
                            counter++;
                            saveMetrics.handleMetricPath(pool, {name : 'aacd_prd_POD30', metricPaths : newTempUrl});
                        }
                    });



                }
            }



    }, function(e) {
        console.log('Error occurred :' + e);
    });
}


function checkInstrumentedUrl(url) {
    return new Promise(function(resolve, reject) {
        const tempUrl = url.replace('/metrics?', '/metric-data?');
        const finalUrl = tempUrl + '&time-range-type=BEFORE_NOW&duration-in-mins=15' + '&output=JSON';
        const options = getOptionalParameters([appDynamicsProp.username, appDynamicsProp.password], 'GET', finalUrl);
        request(options, function (err, backendResponse, body) {
            try {

                resolve(JSON.parse(body));
            } catch (ex) {
                console.error("URL failed, Retrying now : " + finalUrl);
                reject(ex);
            }
        });
    });

}




crawlAppd(BASE_URL, 1);

setTimeout(function() {
    pool.end(function(e) {
        console.log('Closing all pooled connections now');
    });
}, 240000);

function getOptionalParameters(usernamePassword, method, url) {
    return {

        url: url,
        method: method,
        auth: {
            username: usernamePassword[0],
            password: usernamePassword[1]
        }
    };
}



var totalNo = 0;





function callAppD(url, currentLevel) {

    var outType = '';
    if(currentLevel === 1) {
        outType = '?output=JSON';
    } else {
        outType = '&output=JSON';
    }
    const finalUrl = url + outType;
    const options = getOptionalParameters([appDynamicsProp.username, appDynamicsProp.password], 'GET', finalUrl);
    //request.get(options, function(err, backendResponse, body) {
try {
    request(options, function (err, backendResponse, body) {

            var parsedBody;

            try {
                parsedBody = JSON.parse(body);



            } catch (e) {

                console.error("URL failed, Retrying now : " + finalUrl);

                var retryFunc = function (rObj, opt, rCount) {
                    rObj(opt, function (e, ber, b) {
                        try {
                            parsedBody = JSON.parse(b);
                         //   console.log("Found response this time : " + parsedBody);
                        } catch (e1) {
                            if (rCount > 0) {
                                retryFunc(request, options, rCount - 1);
                            } else {
                               // console.log("Sorry failed after 3 retries :" + finalUrl);
                            }
                        }
                    });
                };

                retryFunc(request, options, 3);


            }
            const newLevel = currentLevel + 1;
            for (var obj in parsedBody) {

                const currentObj = parsedBody[obj];
                const name = currentObj.name;
                if (currentObj.type === "folder") {
                    const name = currentObj.name;
                    const folderName = name.replace(new RegExp("%", 'g'), "%25")
                        .replace(new RegExp('\"', 'g'), "%22")
                        .replace(new RegExp(' ', 'g'), "%20")
                        .replace(new RegExp('[|]', 'g'), "%7C")
                        .replace(new RegExp(/[(]/, 'g'), "%28")
                        .replace(new RegExp(/[)]/, 'g'), "%29");
                    if((currentLevel ===1 && folderName === 'Overall%20Application%20Performance') || currentLevel > 1) {

                        var newUrl = '';
                        if (currentLevel === 1)
                            newUrl = url + "?metric-path=" + folderName;

                        else
                            newUrl = url + "%7C" + folderName;

                        callAppD(newUrl, newLevel);
                   }

                    //const folderName = currentObj.name.replace(new RegExp(" ", 'g'), "%20").replace(new RegExp('"', 'g'), "%22");

                } else {
                    totalNo = totalNo + 1;
                    const tempUrl = url + "%7C" + currentObj.name;
                    const newTempUrl = tempUrl.split(pattern1)[1];
                    console.log("Url counter : " + totalNo);
                    //finalMetrics.push({name : 'aacd_prd_POD30', metricPaths : newTempUrl});
                    return saveMetrics.handleMetricPath(mCache, {name : 'aacd_prd_POD30', metricPaths : newTempUrl});
                }

            }
        }
    );
} catch(exp) {
    console.log("Exception in socket hang up : " + exp);
}
}







function closeConnection() {
    pool.end(function(e) {
        console.log('Closing all pooled connections now');
    });
}

function start() {

    return callAppD(BASE_URL, 1);


}

// start().then(function(m) {
//     closeConnection();
// })


