var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function NewNotif(id1, id2, type)
{
    return new Promise(function(resolve, reject){
        // connection.query("DELETE FROM `notification` WHERE id_from = ? AND id_to = ?", [id1, id2, type]);
        connection.query("INSERT INTO `notification` (`id_from`, `id_to`, `type`) VALUES (?, ?, ?)", [id1, id2, type], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function fetchNotif(id)
{
    return new Promise(function(resolve, reject){
        // connection.query("DELETE FROM `notification` WHERE id_from = ? AND id_to = ?", [id1, id2, type]);
        connection.query("SELECT notification.id_from,users.username,album.name,notification.type,notification.is_read, TIMESTAMPDIFF(SECOND,notification.time,NOW()) AS time FROM `notification`,users,album WHERE notification.id_to = ? AND users.id = notification.id_from and album.user_id = notification.id_from and album.type = 1 ORDER BY time DESC", [id], function(err, rows){
            connection.query("UPDATE `notification` SET is_read = 1 WHERE id_to = ?", [id]);
            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve("Blank");
            else    
            resolve(rows);
        })
    })
}

function unreadNotif(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) NB FROm notification where id_to = ? AND is_read = 0", [id], function(err, rows){

            if(err)
            reject (err);
            else if(rows.length == 0)
            resolve(0);
            else    
            resolve(rows[0].NB);
        })
    })
}


function clearNotif(id, id2)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE FROM notification where id_from = ? AND id_to = ?", [id, id2], function(err, rows){

            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}
module.exports.New =  NewNotif;
module.exports.Fetch = fetchNotif;
module.exports.Unread = unreadNotif;
module.exports.Clear = clearNotif;