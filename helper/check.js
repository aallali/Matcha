var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);
const request = require('request');

function usernameTaken(user, id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT LOWER(username) FROM users WHERE username = ? AND id != ?",[user.toLowerCase(), id], function(err, rows){
            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(1);
        })
    }) 
}

function emailTaken(email, id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT LOWER(email) FROM users WHERE email = ? AND id != ?",[email.toLowerCase(), id], function(err, rows){
            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(1);
        })
    }) 
}


module.exports.email = emailTaken;
module.exports.user = usernameTaken;