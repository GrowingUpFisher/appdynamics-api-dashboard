/**
 * Created by dkandpal on 7/19/17.
 */


exports.storeData = function(pool, appName, metricPaths) {
    const arr = appName.split('_');

    const dataToBeSaved = {'application_name' : appName, 'app_name' : arr[0], 'realm' : arr[1], 'pod' : arr[2]};
    for(var i=0; i<metricPaths.length; i++) {
        const columnName = returnColumnName(i + 1);
        dataToBeSaved[columnName] = metricPaths[i];
    }
    return persistData(pool, dataToBeSaved);

}

function persistData(pool, data) {

    return new Promise(function(resolve, reject) {

        pool.getConnection(function (err, connection) {

            connection.beginTransaction(function (btErr) {
                if (btErr) {
                    reject(btErr);
                    //throw btErr;
                }
                connection.query('INSERT INTO appd_metrics SET ?', data, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        return connection.rollback(function () {
                            //throw error;
                            reject(error);
                        });
                    }
                    console.log('Inserted with id : ' + results.insertId);
                    connection.commit(function (e) {
                        //return results.insertId;
                        resolve(results.insertId);
                    });

                });
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
