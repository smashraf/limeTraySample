var querystring = require('querystring');
var http = require('http');
var host = 'api.staging.oyorooms.com';
var headers = {
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic cmFqZXNoLmdhcmdAb3lvcm9vbXMuY29tOnBhc3N3b3JkMTIzIw=='
};

module.exports = function makeApiRequestWithMethod(endpoint, method, data, success) {
    var options;
    if (method == 'GET'){
        options = {
            host : host,
            path : endpoint, // the rest of the url with parameters if needed
            method : 'GET', // do GET
            headers : headers
        };
    }
    var reqGet = http.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);
        res.on('data', function(responseObject) {
            success(responseObject);
            console.log ();
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
 }
