var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);
const request = require('request');
var bcrypt      = require('bcrypt');
var crypto      = require('crypto');


function getAbout(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id,username, fname, lname, email, age, gender, sexpref, city, country, bio, lat, lon FROM users WHERE id = ?",[id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(rows);

        })
    })
}

function online_offline(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT online, TIMESTAMPDIFF(SECOND,con,NOW()) AS time  from online where user_id = ?",[id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
           resolve(rows[0]);

        })
    })
}

function getTags(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT tag FROM tags WHERE user_id = ?",[id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(rows)
        })
    }) 
}

function ScriptAge()
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id FROM users WHERE gender = 'female'", function(err, rows){
            if(err)
            reject (err);
            resolve(rows)
        })
    }) 
}
module.exports.About = getAbout;
module.exports.Tags  = getTags;
module.exports.sAge = ScriptAge;
module.exports.online = online_offline;