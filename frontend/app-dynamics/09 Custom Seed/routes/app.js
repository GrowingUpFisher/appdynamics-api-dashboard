const accountApiUrl = 'https://hermes.saas.appdynamics.com/api/accounts/myaccount';
const appApiUrl = 'http://hermes.saas.appdynamics.com/controller/rest/applications?output=JSON';

const express = require('express');
const request = require('request');
const router = express.Router();
const commonUtility = require('../utility/common-utility');
const esFacade = require('../bin/loadData');

const mysql = require('mysql');
const sqlProp = {
    connectionLimit : 100,
    host : 'localhost',
    'user' : 'root',
    'password' : '',
    database : 'app_dynamics_metrics'
};

const pool = mysql.createPool(sqlProp);
const sqlFacade = require('../bin/mysql-facade');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// ** FOR LOGIN **
router.get('/login', function (req, res, next) {
  console.log("Login Request Initiated");

  const usernamePassword = getUsernamePassword(req);
  const options = getOptionalParameters(usernamePassword, 'GET', accountApiUrl);


  request.get(options, function (err, backendResponse, body) {
    console.log("error : " + err);
    console.log("res : " + res);
    console.log("body : " + body);
    if (err != null) {
      return res.send({ "Status": "Error authenticating" });
    }
    return res.send((backendResponse));
  });

});

// ** FOR RETRIEVING APPLICATIONS **

router.get('/applications', function (req, res, next) {

  console.log("Retrieving Business Applications");
  const usernamePassword = getUsernamePassword(req);
  const options = getOptionalParameters(usernamePassword, 'GET', appApiUrl);

  request.get(options, function (err, backendResponse, body) {
    console.log("error : " + err);
    console.log("res : " + res);
    console.log("body : " + body);
    if (err != null) {
      return res.send({ "Status": "Error Retrieving Applications" });
    }
    return res.send((backendResponse));

  });

});


router.get('/applications/metrics/:appId', function(req, res, next) {
    const applicationName = req.params.appId;
    const sqlQuery = 'Select * from appd_metrics where application_name=\''+applicationName + "\'";
    return sqlFacade.getAppMetrics(pool, sqlQuery, res);



});

router.get('/applications/metrics/:appId/heatmap', function(req, res, next) {
  const applicationName = req.params.appId;
  const metricPath = req.query.path;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const metricPathArr = metricPath.split('|');

  console.log('appName : ' + applicationName);
    console.log('metricPathArr : ' + metricPathArr);
    console.log('metricPath : ' + metricPath);
    console.log('startDate : ' + startDate);
    console.log('endDate : ' + endDate);

  const messageData = {
    application : applicationName,
      path : metricPathArr,
      startDate : startDate,
      endDate : endDate

  };
  const requestData = getHeatMapRequestData(messageData);
    esFacade.retrieveHeatMapData(res, requestData);

});

function getHeatMapRequestData(messageData) {
    const requestData = {
        searchQuery : commonUtility.getSearchQuery(messageData.application, messageData.path),
        filterQuery : commonUtility.getFilterQuery({
            "criteria1" : {
                "range": {
                    "timestamp": {
                        "lte" : messageData.startDate
                    }
                }
            },
            "criteria2" : {
                "range": {
                    "timestamp": {
                        "gte" : messageData.endDate
                    }
                }
            }
        })
    }
    return requestData;
}


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

function getUsernamePassword(req) {

  const auth = (req.header('authorization')).toString();

  const usernamePassword = Buffer.from(auth.split(' ')[1], 'base64').toString().split(":");
  console.log("usernamePassword server side : " + usernamePassword);
  return usernamePassword;
}


module.exports = router;
