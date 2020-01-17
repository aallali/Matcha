var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function NewReport(reporter, reported)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE FROM report WHERE reporter = ? AND reported = ?", [reporter, reported]);
        connection.query("INSERT INTO report  (`reporter`, `reported`) VALUES (?, ?)", [reporter, reported], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}


module.exports.New =  NewReport;

