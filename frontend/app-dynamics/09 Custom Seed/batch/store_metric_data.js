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
const tableNames = ['appd_pl1','appd_pl2', 'appd_pl3', 'appd_pl4',
    'appd_pl5','appd_pl6','appd_pl7','appd_pl8', 'appd_pl9', 'appd_pl10', 'appd_pl11', 'appd_pl12'];

const joinTableNames = ['appd_application_pl1','appd_pl1_pl2','appd_pl2_pl3','appd_pl3_pl4','appd_pl4_pl5','appd_pl5_pl6'
                    ,'appd_pl6_pl7','appd_pl7_pl8', 'appd_pl8_pl9', 'appd_pl9_pl10', 'appd_pl10_pl11', 'appd_pl11_pl12'];


exports.saveData = function(mCache, metricArray, applicationName) {

    //pool.getConnection(function(err, connection) {
    const appArray = applicationName.split("_");
    const appData = {'name' : applicationName, 'app_name' : appArray[0], 'realm_name' : appArray[1], 'pod_name' : appArray[2]};
    persistData(null, 'appd_applications', appData)
        .then(function(app_id) {
            mCache[applicationName] = app_id;
            storeAppMetricNew(mCache, null, metricArray, app_id, 0, 1, false);
        }, function(err) {
            const app_id = mCache[applicationName];
            storeAppMetricNew(mCache, null, metricArray, app_id, 0, 1, true);
        });
    //    connection.release();
   // });

}



exports.storeAppMetricPath = function(mCache, data) {

    pool.getConnection(function(err, connection) {

        storeAppMetricNew(mCache, connection, data, 1, 0, 1, true);
    });

}


function storeAppMetricNew(mCache, connection ,metrics, previousMetricId, previousMetricNo, currentMetricNo, previousExist) {
  //  console.log('mcache : ' + JSON.stringify(mCache));
    if (currentMetricNo <= metrics.length) {



    const metricToBeSaved = metrics[currentMetricNo - 1];
    var dataToBeStored = {};
    if (mCache.hasOwnProperty(metricToBeSaved + '-LEVEL-' + currentMetricNo)) {
        const newMetricId = mCache[metricToBeSaved + '-LEVEL-' + currentMetricNo];
        const newColName = returnColumnName(currentMetricNo);
        const prevColName = returnColumnName(previousMetricNo);
        if (!previousExist) {
            // just inserted previous, and existing metric was already present in db so create an entry in join table
            dataToBeStored[newColName] = newMetricId;
            dataToBeStored[prevColName] = previousMetricId;
            persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                .then(function (rowId) {
                    storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                }, function (err) {

                    storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                });
        } else {
            // shoot a select query before inserting

            const sqlQuery = 'Select * from ' + joinTableNames[currentMetricNo - 1]
                + ' where ' + newColName + "=" + newMetricId + " and " + prevColName + "=" + previousMetricId;
            console.log('SQL query : ' + sqlQuery);
            getData(connection, sqlQuery).then(function (rowsReturned) {
                if (rowsReturned.length === 0) {
                    dataToBeStored[newColName] = newMetricId;
                    dataToBeStored[prevColName] = previousMetricId;
                    persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                        .then(function (rowId) {
                                storeAppMetricNew(connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                            },
                            function (err) {

                                storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                            });
                } else {
                    storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                }
            });
        }
    } else {
        // persist new metric first
        const localData = {'name': metricToBeSaved};
        persistData(connection, tableNames[currentMetricNo - 1], localData)
            .then(function (newMetricId) {
                mCache[metricToBeSaved + '-LEVEL-' + currentMetricNo] = newMetricId;
                const newColName = returnColumnName(currentMetricNo);
                const prevColName = returnColumnName(previousMetricNo);
                dataToBeStored[newColName] = newMetricId;
                dataToBeStored[prevColName] = previousMetricId;
                persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                    .then(function (rowId) {
                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, false);
                    }, function (err) {

                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                    });
            }, function (err) {

                const newColName = returnColumnName(currentMetricNo);
                const prevColName = returnColumnName(previousMetricNo);
                const newMetricId = mCache[metricToBeSaved + '-LEVEL-' + currentMetricNo];
                dataToBeStored[newColName] = newMetricId;
                dataToBeStored[prevColName] = previousMetricId;
                persistData(connection, joinTableNames[currentMetricNo - 1], dataToBeStored)
                    .then(function (rowId) {
                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                    }, function (err) {

                        storeAppMetricNew(mCache, connection, metrics, newMetricId, currentMetricNo, currentMetricNo + 1, true);
                    });


            });


        }
    }
}

function persistData(c, tableName, data) {
    return new Promise(function(resolve, reject) {


        pool.getConnection(function(err, connection) {
            //remove

            if(err) {
                console.log('ERROR CREATED : ' + err);
            }
            connection.query('INSERT INTO ' + tableName + ' SET ?', data, function (error, results, fields) {

                connection.release();
                if (!error) {
                    console.log( 'Saving data : ' + JSON.stringify(data) + ' and table name : ' + tableName + " and insert id :" + results.insertId);
                    return resolve(results.insertId);

                } else {
                    console.log( 'Error Saving data : ' + JSON.stringify(error) +  " -----> " + JSON.stringify(data) + ' and table name : ' + tableName);
                    return reject(error);
                }
            });

// remove
       });
// remove
    });

}


function getData(c, sqlQuery) {

    return new Promise(function(resolve, reject) {

        pool.getConnection(function(err, connection) {

            connection.query(sqlQuery, function (err, rows) {

                connection.release();

                if (err)
                    return reject(err);
                return resolve(rows);
            });

       });
    });

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
        case 10 : return 'pl10_id'; break;
        case 11 : return 'pl11_id'; break;
        case 12 : return 'pl12_id'; break;

    }
}












