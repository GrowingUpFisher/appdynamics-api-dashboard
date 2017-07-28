/**
 * Created by dkandpal on 7/21/17.
 */


exports.getData = function(pool, sql) {

    return fetchData(pool, sql);

}



function fetchData(pool, sqlQuery) {

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