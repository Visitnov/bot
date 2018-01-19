var mysql = require('mysql');
// var logPool  = mysql.createPool({
// 	connectionLimit: 100,
// 	host: 'localhost',
// 	port : 51121,
// 	database:'chatbot',
// 	user: 'root',
// 	password : '67a386e52646cc7a386e5264',
// 	multipleStatements:true,
// 	dateStrings: 'date',
// 	acquireTimeout: 1000000
// });
var logPool  = mysql.createPool({
	connectionLimit: 100,
	host: 'localhost',
	port : 3306,
	database:'chatbot',
	user: 'root',
	password : '',
	multipleStatements:true,
	dateStrings: 'date',
	acquireTimeout: 1000000
});

var getConnection = function(callback) {
    logPool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
/*
var logPool  = mysql.createPool({
	connectionLimit: 100,
	host: '128.199.205.83',
	port : 31306,
	database:'shan_admin',
	user: 'room_services',
	password : 'ASDfajw323941!xasDsfpcS2',
	multipleStatements:true,
	dateStrings: 'date',
	acquireTimeout: 1000000
});

var getConnection = function(callback) {
    logPool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
*/
exports.getConnection = getConnection;
