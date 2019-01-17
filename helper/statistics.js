var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function likes_given(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb from likes WHERE liker  = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}


function likes_taken(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb from likes WHERE liked  = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function dislikes_given(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb from notification WHERE id_from  = ? AND type = 2", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function dislikes_taken(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb from notification WHERE id_to  = ? AND type = 2", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function visits_given(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb from notification WHERE id_from  = ? AND type = 3 ", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function visits_taken(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb from notification WHERE id_to  = ? AND type = 3", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function matches(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb  FROM likes as like1 JOIN likes as like2 on like1.liker = like2.liked WHERE like1.liker = ? AND like1.liked = like2.liker", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function report_given(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb FROM report where reporter = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function report_taken(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb  FROM report where reported = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function block_given(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb  FROM block where blocker = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

function block_taken(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) as nb FROM block where blocked = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}

module.exports.likes_given =  likes_given;
module.exports.likes_taken =  likes_taken;
module.exports.dislikes_given =  dislikes_given;
module.exports.dislikes_taken =  dislikes_taken;
module.exports.visits_given =  visits_given;
module.exports.visits_taken =  visits_taken;
module.exports.matches =  matches;
module.exports.report_given =  report_given;
module.exports.report_taken =  report_taken;
module.exports.block_given =  block_given;
module.exports.block_taken =  block_taken;




