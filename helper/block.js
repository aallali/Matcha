var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);
var like = require('./like');



async function Block(blocker, blocked)
{
    await like.Dislike(blocker, blocked);
    await like.Dislike(blocked, blocker);
    return new Promise(function(resolve, reject){
        
        connection.query("DELETE FROM `block`  WHERE (blocker = ? AND blocked = ?)", [blocker, blocked]);
        connection.query("INSERT INTO `block` (`blocker`, `blocked`) VALUES (?, ?)", [blocker, blocked], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function unBlock(blocker, blocked)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE FROM `block` WHERE blocker = ? AND blocked = ?", [blocker, blocked], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}



function isBlocked(blocker, blocked)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM `block` WHERE (blocker = ? AND blocked = ?) OR (blocker = ? AND blocked = ?)", [blocker, blocked, blocked, blocker], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(1);
        })
    })
}

function blocked_list(id)
{
    
    return new Promise(function(resolve, reject){
        connection.query("SELECT id,fname, lname,username FROM `users` WHERE id in (select blocked from block where blocker  = ?)", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows);
        })
    })
}

module.exports.New =  Block;
module.exports.unBlock= unBlock;
module.exports.isBlocked = isBlocked;
module.exports.List = blocked_list;


