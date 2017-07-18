/**
 * Created by dkandpal on 7/14/17.
 */
/**
 * Created by dkandpal on 7/14/17.
 */
const mysql = require('mysql');

const sqlProp = {
    connectionLimit : 100,
    host : 'localhost',
    'user' : 'root',
    'password' : '',
    database : 'app_dynamics_metrics'
};

const pool = mysql.createPool(sqlProp);
const tableNames = ['appd_pl1','appd_pl2', 'appd_pl3', 'appd_pl4','appd_pl5','appd_pl6','appd_pl7','appd_pl8', 'appd_pl9'];

const joinTableNames = ['appd_application_pl1','appd_pl1_pl2','appd_pl2_pl3','appd_pl3_pl4','appd_pl4_pl5','appd_pl5_pl6'
                    ,'appd_pl6_pl7','appd_pl7_pl8', 'appd_pl8_pl9'];


exports.storeAppMetricPath = function(mCache, data) {

    pool.getConnection(function(err, connection) {

        storeAppMetricNew(mCache, connection, data, 1, 0, 1, true);
    });

}


function storeAppMetricNew(mCache, connection ,metrics, previousMetricId, previousMetricNo, currentMetricNo, previousExist) {
    if(currentMetricNo > metrics.length)
        return;
    console.log('mCache : ' + JSON.stringify(mCache));
    const metricToBeSaved = metrics[currentMetricNo - 1];
    var dataToBeStored = {};
    if(mCache.hasOwnProperty(metricToBeSaved)) {
        const newMetricId = mCache[metricToBeSaved];
        const newColName = returnColumnName(currentMetricNo);
        const prevColName = returnColumnName(previousMetricNo);
        if(!previousExist) {
            // just inserted previous, and existing metric was already present in db so create an entry in join table
            dataToBeStored[newColName] = newMetricId;
            dataToBeStored[prevColName] = previousMetricId;
            persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                .then(function(rowId) {
                    storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                },function(err) {
                    console.log("No one cares");
                    storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                });
        } else {
            // shoot a select query before inserting

            const sqlQuery = 'Select * from '+joinTableNames[currentMetricNo - 1]
                + ' where '+newColName + "="+newMetricId + " and " + prevColName + "=" + previousMetricId;

            getData(connection, sqlQuery).then(function(rowsReturned) {
                if(rowsReturned.length === 0) {
                    dataToBeStored[newColName] = newMetricId;
                    dataToBeStored[prevColName] = previousMetricId;
                    persistData(connection, joinTableNames[currentMetricNo - 1], dataPath)
                        .then(function(rowId){
                            storeAppMetricNew(connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                        },
                        function(err) {
                            console.log("No one cares 2");
                            storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                        });
                } else {
                    storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                }
            });
        }
    } else {
        // persist new metric first
        const localData = {'name' : metricToBeSaved};
        persistData(connection, tableNames[currentMetricNo - 1], localData)
            .then(function(newMetricId) {
                mCache[metricToBeSaved] = newMetricId;
                const newColName = returnColumnName(currentMetricNo);
                const prevColName = returnColumnName(previousMetricNo);
                dataToBeStored[newColName] = newMetricId;
                dataToBeStored[prevColName] = previousMetricId;
                persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                    .then(function(rowId){
                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, false);
                    }, function(err) {
                        console.log('No one cares 3');
                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                    });
            }, function(err) {
                console.log('Error :' + metricToBeSaved + 'existing id in cache : ' + mCache[metricToBeSaved]);
                const newColName = returnColumnName(currentMetricNo);
                const prevColName = returnColumnName(previousMetricNo);
                const newMetricId = mCache[metricToBeSaved];
                dataToBeStored[newColName] = newMetricId;
                dataToBeStored[prevColName] = previousMetricId;
                persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                    .then(function(rowId){
                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                    }, function(err) {
                        console.log('No one cares 4');
                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                    });


            });


    }
}

function persistData(connection, tableName, data) {
    console.log("Persist data :" + JSON.stringify(data));
    return new Promise(function(resolve, reject) {

        connection.query('INSERT INTO ' +tableName + ' SET ?', data, function(error, results, fields){
            if(!error) {
                resolve(results.insertId);
            } else {
                return reject(error);
            }
        });




    });

}


function getData(connection, sqlQuery) {

    return new Promise(function(resolve, reject) {
        connection.query(sqlQuery, function(err, rows) {
            if(err)
                return reject(err);
           resolve(rows);
        });
    });

}

// currentBool true means
// you need to save in mCache too, also check how you use metricNo with tableNames
function storeAppMetrics(connection, metrics, currentForeignKey, metricNo, currentBool) {
    const metricToBeSaved = metrics[metricNo - 1];
    var dataToBeStored = {};
    if(mCache.get(metricToBeSaved)) {
        // metric already exist in table
        const metricId = mCache.get(metricToBeSaved);
        if(currentBool) {
            // just inserted previous, and existing metric was already present in db so create an entry in join table

            if(metricNo ===0) {
                const colName = returnColumnName(metricNo);
                dataToBeStored[colName] = metricId;
                dataToBeStored['app_id'] = currentForeignKey;

            } else {
                const newColName = returnColumnName(metricNo);
                const prevColName = returnColumnName(metricNo - 1);
                dataToBeStored[newColName] = metricId;
                dataToBeStored[prevColName] = currentForeignKey;

            }
        persistData(connection, tableNames[metricNo], dataToBeStored)
            .then(function(rowId) {
                storeAppMetrics(connection, metrics, metricId, metricNo + 1, false);

            });

        } else {
            // do a select query if you find a record , move on else insert this combination
            const newColName = returnColumnName(metricNo);
            const prevColName = returnColumnName(metricNo - 1);
            const sqlQuery = "Select * from " + joinTableNames[metricNo] + " where "+newColName + "=\'"


        }
    } else {
        // insert metric point, use this id and save in join table with previous foreign key and then move on
        dataToBeStored['name'] = metricToBeSaved;
        persistData(connection, tableNames[metricNo], dataToBeStored).then(function(rowId) {
            const newColName = returnColumnName(metricNo);
            const prevColName = returnColumnName(metricNo - 1);
            dataToBeStored[newColName] = rowId;
            dataToBeStored[prevColName] = currentForeignKey;
            persistData(connection, tableNames[metricNo], dataToBeStored).then(function(ignoredId) {
                storeAppMetrics(connection, metrics, rowId, metricNo + 1, true);
            });
        });

    }
}

function returnColumnName(id) {

    switch(id) {
        case 0 : return 'app_id'; break;
        case 1 : return 'pl1_id'; break;
        case 2 : return 'pl2_id'; break;
        case 3 : return 'pl3_id'; break;
        case 4 : return 'pl4_id'; break;
        case 5 : return 'pl5_id'; break;
        case 6 : return 'pl6_id'; break;
        case 7 : return 'pl7_id'; break;
        case 8 : return 'pl8_id'; break;
        case 9 : return 'pl9_id'; break;

    }
}




exports.insertData = function(level, tableName, data) {

    pool.getConnection(function(err, connection) {
        if(err)
            return {error : 'Error Connecting to MySQL'};

        const applicationName = data.applications.name;
        connection.query('Select * from appd_applications where name=\'' + applicationName + "\'", function(err, rows) {
            if(!err) {

                if(rows.length > 0) {
                    const appId = rows[0].app_id;

                } else {

                   const insertedData =  {name : applicationName, pod_name : 'POD24', realm_name : 'prd', app_name : 'aagl'};
                connection.query('Insert INTO appd_applications SET ?', insertedData, function(err2, results, fields) {
                    connection.release();
                    if(!err2) {
                        results.insertId;
                    } else {
                        console.log('Error inserting data : ' + err);
                    }
                });
                }
            } else {
                console.log(console.log("rows inserted : " + rows));
            }
        });
    });


};











