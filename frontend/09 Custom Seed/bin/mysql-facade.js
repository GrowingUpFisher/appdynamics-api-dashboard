/**
 * Created by dkandpal on 7/21/17.
 */
const mysqlData = require('./mysql-data');

exports.getAppMetrics = function(pool, sql, res) {
    var responseObj = [];
        mysqlData.getData(pool, sql)
            .then(function(rows) {

                for(var i=0; i< rows.length; i++) {
                    const currentObj = rows[i];
                   recursiveCheck(currentObj, 'pl', 1, responseObj);

                }
                return res.send(responseObj);

        });
}


function recursiveCheck(dsObj, partField, counter, nodes) {
    const key = partField + counter + "_id";

    if(dsObj[key] && dsObj[key] !== null) {
        const plName = getCleanUrl(dsObj[key]);
        const nextNode = checkFieldExist(plName, nodes);
        if(nextNode != null) {
            recursiveCheck(dsObj, partField, counter+1, nextNode.children);
        } else {
            // create node;
            const nextNode = {
                name : getCleanUrl(plName),
                children : []
            }
            nodes.push(nextNode);
            recursiveCheck(dsObj, partField, counter+1, nextNode.children);

        }

    } else {
        return;
    }

}

function checkFieldExist(field, nodes) {

    for(var i=0; i< nodes.length; i++) {
            const currentObj = nodes[i];
            if(getCleanUrl(currentObj.name) === field) {
              return currentObj;
            }
    }

    return null;
}

function getCleanUrl(name) {
    const folderName = name.replace(new RegExp("%25", 'g'), "%")
        .replace(new RegExp('%22', 'g'), '\"')
        .replace(new RegExp("%20", 'g'), ' ')
        .replace(new RegExp("%7C", 'g'), '[|]')
        .replace(new RegExp("%28", 'g'), /[(]/)
        .replace(new RegExp("%29", 'g'), /[)]/);
    return folderName;
}