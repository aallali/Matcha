var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function conneco(id)
{
    return new Promise(function(resolve, reject){
        connection.query("Update online set online = 1 where user_id = ?", [id]);
        resolve(1);

    })
}

function deconneco(id)
{
    return new Promise(function(resolve, reject){
        connection.query("Update online set online = 0 where user_id = ?", [id]);
        resolve(1);
    })
}

module.exports.conneco =  conneco;

module.exports.deconneco =  deconneco;
