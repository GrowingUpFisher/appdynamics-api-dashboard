/**
 * Created by dkandpal on 7/31/17.
 */
const moment = require('moment');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const out =  moment(1490699490526).format("YYYY MMM DD HH mm");
storeMetricData();

function storeMetricData() {
    const startValue = 1500217200000;

    for(var i=1400; i<1600; i++) {
        const timestamp = startValue + 60000 * i;
        const metricValue = 100 + Math.floor(Math.random() * 500);
        esClient.index({
            index: 'apm-original',
            type: 'appd',
            // id: counter,
            body: {
                "application" : "aaqx_prd_POD24",
                "pl1" : "Overall Application Performance",
                "pl2" : "Average Response Time",
                "pl3" : "",
                "pl4" : "",
                "pl5" : "",
                "pl6" : "",
                "pl7" : "",
                "pl8" : "",
                "timestamp" : timestamp,
                "value" : Number(metricValue)
            }
        }, function (error, response) {
            if(error)
                console.error("Failed to insert" + error);
            else
                console.log("Inserted successfully" + i);

        });
    }
}

