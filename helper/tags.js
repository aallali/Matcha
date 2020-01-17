var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function isExists(tag, id)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE from tags WHERE user_id = ?",[id]);
        connection.query("SELECT * FROM tags WHERE LOWER(tag) = ? and user_id = ?",[tag.toLowerCase(), id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(1);
            else
            resolve(0);
        })
    })
}

function addTag(tag, id)
{
    return new Promise(function(resolve, reject){
        connection.query("INSERT INTO tags (user_id, tag) VALUES (?, ?)",[id, tag], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length != 0)
            resolve(1);
            else
            resolve(0);
        })
    })
}

function getTagsbyId(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT tag FROM tags where user_id = ?",[id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(rows);
        })
    })
}

function getAllTags()
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT tag FROM tags GROUP BY tag", function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(rows);
        })
    })
}
module.exports.Exists = isExists;
module.exports.Add = addTag;
module.exports.fetch = getTagsbyId;
module.exports.All = getAllTags;