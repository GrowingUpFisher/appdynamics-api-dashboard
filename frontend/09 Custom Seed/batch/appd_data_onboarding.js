/**
 * Created by dkandpal on 7/13/17.
 */
var limit = require("simple-rate-limiter");
const request = limit(require("request")).to(1).per(10);
const saveMetrics = require('./save_metric_path');
const store_metric_data = require('./store_metric_data');
const BASE_URL = 'https://hermes.saas.appdynamics.com/controller/rest/applications/aacd_prd_POD30/metrics';

const appDynamicsProp = {
    username : 'dkandpal@hermes',
    password : 'appd123!'
}
const pattern1 = 'metric-path=';

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
                            console.log("Found response this time : " + parsedBody);
                        } catch (e1) {
                            if (rCount > 0) {
                                retryFunc(request, options, rCount - 1);
                            } else {
                                console.log("Sorry failed after 3 retries :" + finalUrl);
                            }
                        }
                    });
                };
                retryFunc(request, options, 3);


            }
            const newLevel = currentLevel + 1;
            for (obj in parsedBody) {

                const currentObj = parsedBody[obj];

                if (currentObj.type === "folder") {
                    //const folderName = currentObj.name.replace(new RegExp(" ", 'g'), "%20").replace(new RegExp('"', 'g'), "%22");
                    const name = currentObj.name;
                    const folderName = name.replace(new RegExp("%", 'g'), "%25")
                        .replace(new RegExp('\"', 'g'), "%22")
                        .replace(new RegExp(' ', 'g'), "%20")
                        .replace(new RegExp('[|]', 'g'), "%7C")
                        .replace(new RegExp(/[(]/, 'g'), "%28")
                        .replace(new RegExp(/[)]/, 'g'), "%29");
                    var newUrl = '';
                    if (currentLevel === 1)
                        newUrl = url + "?metric-path=" + folderName;

                    else
                        newUrl = url + "%7C" + folderName;

                    callAppD(newUrl, newLevel);
                } else {
                    totalNo = totalNo + 1;
                    const tempUrl = url + "%7C" + currentObj.name;
                    const newTempUrl = tempUrl.split(pattern1)[1];
                    saveMetrics.handleMetricPath(newTempUrl);
                    return;
                }

            }
        }
    );
} catch(exp) {
    console.log("Exception in socket hang up : " + exp);
}
}

// callAppD(BASE_URL, 1);



var data = [
    {
        name : 'aaql_prd_POD25',
        metricPaths : ['', '', '']
    }
];

var mp = [
    'Application%20Infrastructure%20Performance%7CECOM_aacd_prd%7CIndividual%20Nodes%7CPOD30_blade3-9%7CJVM%7CGarbage%20Collection%7CMemory%20Pools%7CCMS%20Old%20Gen%7CCurrent Usage (MB)',
    'Application%20Infrastructure%20Performance%7CECOM_aacd_prd%7CIndividual%20Nodes%7CPOD30_blade3-9%7CJVM%7CGarbage%20Collection%7CMemory%20Pools%7CCMS%20Old%20Gen%7CMemory Heap',
    'Appl%20Infrastructure%20Performance%7CECOM_aacd_prd%7CIndividual%20Nodes%7CPOD30_blade3-9%7CJVM%7CGarbage%20Collection%7CMemory%20Pools%7CCMS%20Old%20Gen%7CMemory Heap'
];
saveMetrics.handleMetricPath(mp);



