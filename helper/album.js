var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function addPic(name, type, id)
{
    return new Promise(function(resolve, reject){
        connection.query("INSERT INTO album (user_id, name, type) VALUES(?, ?, ?)",[id, name, type], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}


function isPdpSet(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT * from album where user_id = ? and type = 1",[id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(1);
        })
    })
}

function getPDP(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT name from album where user_id = ? and type = 1 LIMIT 1",[id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(rows[0].name);
        })
    })
}

function getAlbum(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id,name from album where user_id = ?",[id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(rows);
        })
    })
}

function swapPdp(id, idP)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE album set type = 0 WHERE user_id = ?",[id])
        connection.query("UPDATE album set type = 1 WHERE user_id = ? AND id = ?",[id, idP], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}


function deletePic(id, idP)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE from album WHERE user_id = ? AND id = ? AND type = 0",[id, idP], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function countAlbum(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb FROM album where user_id = ?",[id], function(err, rows){
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

module.exports.Add = addPic;
module.exports.isPdpSet = isPdpSet;
module.exports.PDP = getPDP;
module.exports.Album = getAlbum;
module.exports.Swap = swapPdp;
module.exports.Delete = deletePic;
module.exports.Count = countAlbum;
