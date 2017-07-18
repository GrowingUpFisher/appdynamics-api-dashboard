const accountApiUrl = 'https://hermes.saas.appdynamics.com/api/accounts/myaccount';
const appApiUrl = 'http://hermes.saas.appdynamics.com/controller/rest/applications?output=JSON';
const appBaseMetricApiUrl = 'http://hermes.saas.appdynamics.com/controller/rest/applications/4124/metrics?output=JSON';


const express = require('express');
const request = require('request');
const router = express.Router();

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

// ** FOR RETRIEVING APPLICATION METRICS RECURSIVELY

router.get('/applications/metrics/:appId', function (req, res, next) {
  const usernamePassword = getUsernamePassword(req);
  const appId = req.params.appId;
  const baseMetricUrl = 'https://hermes.saas.appdynamics.com/controller/rest/applications/' + appId + '/metrics?output=JSON';
  const options = getOptionalParameters(usernamePassword, 'GET', baseMetricUrl);

  request.get(options, function (err, backendResponse, body) {
    console.log("error : " + err);
    console.log("res : " + res);
    console.log("body : " + body);
    if (err != null) {
      return res.send({ "Status": "Error Retrieving Applications" });
    }
    return res.send((JSON.parse(body)));

  });

});

router.get('/fetchData', function (req, res, next) {
  const usernamePassword = getUsernamePassword(req);
  const targetUrl = "https://hermes.saas.appdynamics.com/controller/rest/applications/aaqp_prd_POD24/metric-data?metric-path=Business%20Transaction%20Performance%7CBusiness%20Transactions%7CECOM_aaqp_prd%7CPipelineBL.Product.Show%7CAverage%20Response%20Time%20%28ms%29&time-range-type=BEFORE_NOW&duration-in-mins=15&rollup=false&output=JSON";
  const options = getOptionalParameters(usernamePassword, 'GET', targetUrl);

  request.get(options, function (err, backendResponse, body) {
    console.log("error : " + err);
    console.log("res : " + res);
    console.log("body : " + body);
    if (err != null) {
      return res.send({ "Status": "Error Retrieving Applications" });
    }
    return res.send((JSON.parse(body)));

  });
});

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
