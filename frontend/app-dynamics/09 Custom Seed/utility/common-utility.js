/**
 * Created by dkandpal on 7/28/17.
 */
const p1 = new RegExp("%", 'g')
const p2 = new RegExp('\"', 'g');
const p3 = new RegExp(' ', 'g');
const p4  =new RegExp('[|]', 'g');
const p5 = new RegExp(/[(]/, 'g');
const p6 = new RegExp(/[)]/, 'g');

const p7 = new RegExp('%20', 'g');
const moment = require('moment');

exports.cleanUrl = function(name) {
    const folderName = name.replace(p1, "%25")
        .replace(p2, "%22")
        .replace(p3, "%20")
        .replace(p4, "%7C")
        .replace(p5, "%28")
        .replace(p6, "%29");
    return folderName;
}

exports.reverseCleanUrl = function(name) {
    return name.replace(p7, " ");
}

exports.getSearchQuery = function (application, path) {
    const queries = [];
    queries.push(
        { "match": { "application": application} }
    );
    for(var i=0; i< path.length; i++) {
        const outerObj = {};
        const innerObj = {};
        innerObj["pl" + (i+1)] = this.reverseCleanUrl(path[i]);
        outerObj["match"] = innerObj;
        queries.push(outerObj);

    }
    return queries;

}

exports.getFilterQuery = function(criteria) {
    const filterQuery = [];
    for(var key in criteria) {
        if (criteria.hasOwnProperty(key)) {
            filterQuery.push(criteria[key]);
        }
    }
    return filterQuery;
}

function formatDate(dateStr) {
    return moment(dateStr).format('YYYY MMM DD HH mm').split(" ");
}

exports.groupByDate = function(data) {
    const finalOut = {};
    for(var i=0; i<data.length; i++) {
        const metricValue = data[i].value;
        const formatedDateArr = formatDate(data[i].timestamp);
        const yearMonDate = formatedDateArr[0] + " / " + formatedDateArr[1] + " / " + formatedDateArr[2];
        if(finalOut[yearMonDate]) {
            // already exist,
            const yearMonDateObj = finalOut[yearMonDate];
            const newAverage = ((yearMonDateObj["average"] * yearMonDateObj["count"] + metricValue) / (yearMonDateObj["count"] + 1));
            yearMonDateObj["average"] = newAverage;
            yearMonDateObj["count"] = yearMonDateObj["count"] + 1;

            const hourObj = yearMonDateObj["hour"];
            if(hourObj[formatedDateArr[3]]) {
                // existing hour of the day, different minute

                const minuteObj = hourObj[formatedDateArr[3]];
                const newAverage = ((minuteObj['average'] * minuteObj['count'] + metricValue) / (minuteObj['count'] + 1));
                minuteObj['average'] = newAverage;
                minuteObj['count'] = minuteObj['count'] + 1;
                const metricVal = minuteObj['minute'];
                metricVal[formatedDateArr[4]] = {"value" : metricValue};
                //minuteObj['minute'] = metricVal;


            } else {
                // new hour
                const minuteObj = {};
                minuteObj[formatedDateArr[4]] = { "value" : metricValue};
                hourObj[formatedDateArr[3]] = {
                    "average" : metricValue,
                    "count" : 1,
                    "minute" : minuteObj
                }
            }


        } else {
            // first time entry of year mon date
            const minuteObj = {};
            const hourObj = {};
            minuteObj[formatedDateArr[4]] = {"value" : metricValue};
            hourObj[formatedDateArr[3]] = {
                                        "average" : metricValue,
                                        "count" : 1,
                                        "minute" : minuteObj
                                            };
            finalOut[yearMonDate] = {
                "average" : metricValue,
                "count" : 1,
                "hour" : hourObj
            };

        }
    }
    return finalOut;
}


