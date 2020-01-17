var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);




function NewLike(liker, liked)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE FROM likes WHERE liker = ? AND liked = ?", [liker, liked]);
        connection.query("INSERT INTO likes (`liker`, `liked`) VALUES (?, ?)", [liker, liked], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function disLike(liker, liked)
{
    return new Promise(function(resolve, reject){
        connection.query("DELETE FROM likes WHERE liker = ? AND liked = ?", [liker, liked], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function getLikes(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) AS nb FROM `likes` WHERE liked = ?", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows[0].nb);
        })
    })
}


function ifLiked(liker, liked)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT * FROM `likes` WHERE liker = ? AND liked = ?", [liker, liked], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(1);
        })
    })
}

function LikedList(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT users.id, users.fname, users.lname, album.name FROM users JOIN (SELECT liked from likes where liker = ?) likes ON users.id = likes.liked JOIN album on  users.id = album.user_id AND album.type = 1", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows);
        })
    })
}

async function isMatch(id1, id2)
{
    var one = await ifLiked(id1, id2);
    var two =  await ifLiked(id2, id1);
    if(one == 1  && two == 1)
    return 1;
    else
    return 0;
}
function Matches(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT like1.liked FROM likes as like1 JOIN likes as like2 on like1.liker = like2.liked WHERE like1.liker = ? AND like1.liked = like2.liker", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows);
        })
    })
}
function get_name(id)
{
    return new Promise(function(resolve, reject){
        connection.query("Select users.id,  users.fname,  users.lname, album.name FROM users,album where users.id = ? and users.id = album.user_id AND album.type = 1", [id], function(err, rows){
            if(err)
            reject (err);
            else if(!rows.length)
            resolve(0);
            else
            resolve(rows);
        })
    })
}
module.exports.New =  NewLike;
module.exports.Dislike = disLike;
module.exports.HeLikeHim = ifLiked;
module.exports.Total = getLikes;
module.exports.List = LikedList;
module.exports.isMatch = isMatch;
module.exports.Matches = Matches;
module.exports.info_match =  get_name;

