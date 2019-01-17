var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);
const request = require('request');




function update_Username(username, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET username = ? WHERE id = ?",[username, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function update_First_name(fname, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET fname = ? WHERE id = ?",[fname, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function update_last_name(lname, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET lname = ? WHERE id = ?",[lname, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function update_email(email, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET email = ? WHERE id = ?",[email, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function update_age(age, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET age = ? WHERE id = ?",[age, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    }) 
}

function update_gender(gender, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET gender = ? WHERE id = ?",[gender, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}

function update_sex_pref(sexpref, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET sexpref = ? WHERE id = ?",[sexpref, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })
}


function update_bio(bio, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET bio = ? WHERE id = ?",[bio, id], function(err, rows){
            if(err)
            reject (err);
            else
            resolve(1);
        })
    })  
}

function updateLoc(id, lat, lon)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET lat = ? , lon = ? WHERE id = ?",[lat, lon, id], function(err, rows){
            if(err)
            {
                console.log(err);
                reject (err);
            }
            else
            resolve(1);
        })
    })
}

function updateCountry(id, country)
{

    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET country = ? WHERE id = ?",[country, id], function(err, rows){
            if(err)
            {
                console.log(err);
                reject (err);
            }
            else
            resolve(1);
           
        })
    })
}

function updateCity(id, city)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET city = ? WHERE id = ?",[city, id], function(err, rows){
            if(err)
            {
                console.log(err);
                reject (err);
            }
            else
            resolve(1);
           
        })
    })
}
function getState(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT complete FROM users WHERE id = ?",[id], function(err, rows){
            if(err)
            {
                console.log(err);
                reject (err);
            }
            else
            resolve(rows[0].complete);
           
        })
    })
}
function updateState(com, id)
{
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users SET complete = ? WHERE id = ?",[com, id], function(err, rows){
            if(err)
            {
                console.log(err);
                reject (err);
            }
            else
            resolve(1);
           
        })
    })
}


module.exports.Loc      = updateLoc;
module.exports.Country  = updateCountry;
module.exports.City     = updateCity;
module.exports.Username = update_Username;
module.exports.Fname    = update_First_name;
module.exports.Lname    = update_last_name;
module.exports.Email    = update_email;
module.exports.Age      = update_age;
module.exports.Gender   = update_gender;
module.exports.SexPref  = update_sex_pref;
module.exports.Bio      = update_bio;
module.exports.Stat     = getState;
module.exports.Stat1    = updateState;