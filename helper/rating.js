var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function NewRate(rater, rated, rate)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE FROM rate WHERE rater = ? AND rated = ?", [rater, rated]);
        connection.query("INSERT INTO rate (`rater`, `rated`, `rate`) VALUES (?, ?, ?)", [rater, rated, rate], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}


function getFame(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT FLOOR(AVG(rate)) AS fame FROM `rate` WHERE rated = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].fame);
        })
    })
}

function get_rate_by(rater ,rated)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT rate  FROM `rate` WHERE rater = ? and rated = ?", [rater, rated], function(err, rows){
            if(err)
            {
                console.log(err)
                reject (err);
            }
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].rate);
        })
    })
}


module.exports.New =  NewRate;
module.exports.Fame = getFame;
module.exports.get_rate_by = get_rate_by;

