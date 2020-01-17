var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function NewMsg(from, to, msg)
{
    return new Promise(function(resolve, reject){
        id_conv = from+""+to;
        connection.query("INSERT INTO `chat` (`id`, `id_conv`, `id_from`, `id_to`, `message`, `is_read`, `time`) VALUES (NULL, ?, ?, ?, ?, '0', CURRENT_TIMESTAMP);", [id_conv, from, to, msg], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function fetchConv(token, token2)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id_from, id_to, message, is_read, TIMESTAMPDIFF(SECOND,chat.time,NOW()) AS time FROM chat where id_conv = ? OR id_conv = ?", [token, token2], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows);
        })
    })
}

function myNamePic(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT users.id, users.username, users.fname, users.lname, album.name  FROM users,album where users.id = ? and album.user_id = users.id AND album.type = 1 ", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows);
        })
    })
}
function ReadIt(from, to)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE chat set is_read = 1 WHERE id_from = ? AND id_to = ?", [from , to], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}
function unReadConv(id, id2)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) AS nb from chat  WHERE id_from = ? AND id_to = ? AND is_read = 0 ", [id, id2], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}
function unReadTotal(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) AS nb from chat  WHERE id_to = ? AND is_read = 0 ", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function online_friend(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT online from online  where user_id = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].online);
        })
    })
}

module.exports.New =  NewMsg;
module.exports.fetchConv = fetchConv;
module.exports.MyName = myNamePic;
module.exports.Vue =  ReadIt;
module.exports.unReadConv = unReadConv;
module.exports.unReadTotal = unReadTotal;
module.exports.Online  = online_friend;


