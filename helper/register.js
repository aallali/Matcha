var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);
const request = require('request');

function register(a, b, c, d, e, f, g, h, i, j)
{
    return new Promise(function(resolve, reject){
        connection.query("INSERT INTO `users` (`username`, `email`, `fname`, `lname`, `age`, `gender`, `city`, `country`, `password`,`token`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[a, b, c, d, parseInt(e), f, g, h, i, j], function(err, rows){
            if(err)
            reject (err)
            else
            {
                connection.query("INSERT INTO `online` (`id`, `user_id`, `online`, `con`) VALUES (NULL, (select id from users where username = ?), '0', CURRENT_TIMESTAMP);", [a]);
                connection.query("INSERT INTO `rate` (`id`, `rater`, `rated`, `rate`) VALUES (NULL, '1', (select id from users where username = ?), '0');", [a]);

                resolve(rows);
            }
        })
    })
}

function emailTaken(email)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT LOWER(email) FROM users WHERE email = ?",[email.toLowerCase()], function(err, rows){
            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(1);
        })
    }) 
}

function usernameTaken(user)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT LOWER(username) FROM users WHERE username = ?",[user.toLowerCase()], function(err, rows){
            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(0);
            else
            resolve(1);
        })
    }) 
}

function ApiCountry(city)
{
    return new Promise(function(resolve, reject){
        request(encodeURI('http://api.opencagedata.com/geocode/v1/json?q=\''+city+'\'.&key=0d9e3d64e0a64c47beb45e8ab385ef10'), { json: true }, (err, res, body) => {
            if (err) { reject(err) }
      
        if(typeof body.results !== 'undefined' && body.results.length != 0 )
        {
          
            if(body.results[0].components.country.length != 0)
            resolve(body.results[0].components.country);
            else
            resolve (0);
        }
        else resolve (0);
          });
    })
}

function ApiLatLon(city)
{
    return new Promise(function(resolve, reject){
        request(encodeURI('http://api.opencagedata.com/geocode/v1/json?q=\''+city+'\'.&key=0d9e3d64e0a64c47beb45e8ab385ef10'), { json: true }, (err, res, body) => {
            if (err) { reject(err) }
      
        if(typeof body.results !== 'undefined' && body.results.length != 0 )
        {
          
            if(body.results[0].geometry.length != 0)
            resolve(body.results[0].geometry);
            else
            resolve (0);
        }
        else resolve (0);
          });
    })
}

function ApiCity(country)
{
    return new Promise(function(resolve, reject){
        request(encodeURI('http://api.opencagedata.com/geocode/v1/json?q=\''+country+'\'.&key=0d9e3d64e0a64c47beb45e8ab385ef10'), { json: true }, (err, res, body) => {
            if (err) { reject(err) }
       
        if(typeof body.results !== 'undefined' && body.results.length != 0 )
        {
            if(typeof body.results[0].components.city !== 'undefined')
            resolve(body.results[0].components.city);
            else if(typeof body.results[0].components.town !== 'undefined')
            resolve(body.results[0].components.town);
            else
            resolve (0);
            
        }
        else resolve (0);
          });
    })
}


module.exports.register = register;
module.exports.ApiCountry = ApiCountry;
module.exports.ApiCity = ApiCity;
module.exports.LatLoc = ApiLatLon;

module.exports.emailTaken = emailTaken;
module.exports.usernameTaken = usernameTaken;