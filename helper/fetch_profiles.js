var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);

function costum_query(id, gender, tags, minF, maxF, minA, maxA, minD, maxD,  sort, offset, limit)
{
    var sql = 
"SELECT Distinct users.id, users.username, users.fname,  users.lname, users.age, users.lat, users.lon, users.city, users.city, country, users.gender, pdp.name, FLOOR(kmm.km) AS km,fame.fame "+
"FROM users "+
"JOIN tags " +
"ON users.id = tags.user_id "+
"JOIN "+
"(SELECT name,user_id from album where type = '1') pdp "+
"on users.id = pdp.user_id "+
"JOIN "+
"(SELECT  rated, FLOOR(AVG(rate)) as fame from rate GROUP BY rated) fame "+
"ON users.id = fame.rated "+
"JOIN "+
"(select distance.id, distance.km from (SELECT b.id, 111.1111 * DEGREES(ACOS(COS(RADIANS(a.lat)) * COS(RADIANS(b.lat)) * COS(RADIANS(a.lon) - RADIANS(b.lon)) + SIN(RADIANS(a.lat)) * SIN(RADIANS(b.lat)))) AS km FROM users AS a JOIN users AS b ON a.id <> b.id WHERE a.id = "+id+" AND b.id in (select id from users where id != "+id+")) as distance inner join users on distance.id = users.id WHERE distance.km >= 0 AND distance.km <= 1500000 ORDER BY distance.km) kmm "+
"on users.id = kmm.id "+
"WHERE  users.id not in (select blocked from block where blocker = "+id+") AND users.id not in (select blocker from block where blocked = "+id+") and users.id not in (select  liked from likes where  liker = "+id+") AND (users.complete LIKE '%1%'  && users.complete LIKE '%2%' && users.complete LIKE '%3%') AND (users.verified = 1) AND ("+tags+") AND ("+gender+") AND (fame.fame >= "+minF+" AND  fame.fame <= "+maxF+") AND (users.age >= "+minA+" AND users.age <= "+maxA+") AND (km >= "+minD+" AND km <= "+maxD+") "+
sort+" LIMIT "+offset+","+limit+"";
return sql;
}
function fetchAll(id, gender, tags, minF, maxF, minA, maxA, minD, maxD,  sort, offset, limit)
{
    var sql = costum_query(id, gender, tags, minF, maxF, minA, maxA, minD, maxD, sort, offset, limit);
  
   //console.log(sql);
    return new Promise(function(resolve, reject){
        connection.query(sql ,[id], function(err, rows){
          
            if(err)
            {
                console.log(err);
                reject (err);
            }
            else if(rows.length == 0)
            resolve("KO");
            else
            resolve(rows)
        })
    })   
}
function get_sex_pref(id)
{
        return new Promise(async function(resolve ,reject){
            connection.query("SELECT sexpref from users where id = ?", [id], function (err, rows){
                if(err)
                reject(err)
                else if(!rows.length)
                resolve(0)
                else    
                resolve(rows[0].sexpref);        
            })
        })
     
}
function  get_age(id)
{
        return new Promise(async function(resolve ,reject){
            connection.query("SELECT age from users where id = ?", [id], function (err, rows){
                if(err)
                reject(err)
                else if(!rows.length)
                resolve(18)
                else    
                resolve(rows[0].age);        
            })
        })
     
}

function fetDistance(id, id2)
{
    return new Promise(async function(resolve ,reject){
        connection.query("select FLOOR(km) as KM from (SELECT b.id, 111.1111 * DEGREES(ACOS(COS(RADIANS(a.lat)) * COS(RADIANS(b.lat)) * COS(RADIANS(a.lon) - RADIANS(b.lon)) + SIN(RADIANS(a.lat)) * SIN(RADIANS(b.lat)))) AS km FROM users AS a JOIN users AS b ON a.id <> b.id WHERE a.id = ? AND b.id in (select id from users where id = ?)) as distance inner join users on distance.id = users.id  ORDER BY distance.km", [id, id2], function (err, rows){
            if(err)
            reject(err)
            else
            resolve(rows);        
        })
    })
}

module.exports.All =  fetchAll;
module.exports.distance =  fetDistance;
module.exports.get_sex_pref = get_sex_pref;
module.exports.get_age = get_age;
