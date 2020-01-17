var dbconfig = require('../config/database');
var mysql = require('mysql2');
var connection = mysql.createConnection(dbconfig.connection);
const request = require('request');
var bcrypt      = require('bcrypt');
var crypto      = require('crypto');

async function loginEmail(email, pass)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id, email, password, verified, complete FROM users where email = ?",[email], function(err, rows){
            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(1);
            else if(!bcrypt.compareSync(pass, rows[0].password))
            resolve(2);
            else if(rows[0].verified == 0)
            resolve(3); 
            else if(rows[0].complete.indexOf('1') == -1 || rows[0].complete.indexOf('2') == -1 || rows[0].complete.indexOf('3') == -1)
            resolve([4, rows[0].id, rows[0].username]);
            else if(isBanned(rows[0].id) == 1)
            resolve(5);
            else
            {
                connection.query("Update online set online = 1 where user_id = ?", [rows[0].id]);
                resolve([0, rows[0].id, rows[0].username]);
            }
        })
    })
}

function loginUser(user, pass)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id, username, password, verified, complete FROM users where username = ?",[user], async function(err, rows){
     

            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(1);
            else if(!bcrypt.compareSync(pass, rows[0].password))
            resolve(2);
            else if(rows[0].verified == 0)
            resolve(3); 
            else if(rows[0].complete.indexOf('1') == -1 || rows[0].complete.indexOf('2') == -1 || rows[0].complete.indexOf('3') == -1)
            resolve([4, rows[0].id, rows[0].username]);
            else if(await isBanned(rows[0].id) == 1)
            resolve(5);
            else
            {
                connection.query("Update online set online = 1 where user_id = ?", [rows[0].id]);
                resolve([0, rows[0].id, rows[0].username]);
            }
        })
    })
}

function isBanned(id)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT COUNT(*) AS ban FROM report WHERE reported = ? ",[id], function(err, rows){
            if(err)
            reject (err)
            else if(rows.length == 0)
            resolve(0);
            else if(parseInt(rows[0].ban) >= 2)
            resolve(1);
            else
            resolve(0);
        })
    })
}

function verifyAcc(id)
{
    var token = crypto.randomBytes(10).toString('hex');
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users set verified = '1', token = ? WHERE id = ? ",[token, id], function(err, rows){
            if(err)
            reject (err)
            else
            resolve(1);
        })
    })
}
function resetPass(id, pass, token)
{
    var token = crypto.randomBytes(10).toString('hex');
    return new Promise(function(resolve, reject){
        connection.query("UPDATE users set password = ? , token = ? WHERE id = ? ",[pass, token, id], function(err, rows){
            if(err)
            reject (err)
            else
            resolve(1);
        })
    })
}


function validTokenVerif(token)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id, token FROM users WHERE token = ?",[token], async function(err, rows){
            if(err)
            reject (err)

            if(!rows.length)
            resolve(0)
            else
            {
                try {
                    await verifyAcc(rows[0].id)
                    resolve(1);
                    }
                    catch(e)
                    {
                        console.log(e);
                        resolve(0);
                    }
            }
        })
    })
}


function validTokenReset(token)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id, token FROM users WHERE token = ?",[token], async function(err, rows){
            if(err)
            reject (err)

            if(!rows.length)
            resolve(0)
            else
            {
                try {
                    resolve(rows[0]);
                    }
                    catch(e)
                    {
                        console.log(e);
                        resolve(0);
                    }
            }
        })
    })
}

function getToken(email)
{
    return new Promise(function(resolve, reject){
        connection.query("SELECT id, token, username FROM users WHERE email = ?",[email], async function(err, rows){
            if(err)
            reject (err)

            if(!rows.length)
            resolve(0)
            else
            {
                try {
                    resolve(rows[0]);
                    }
                    catch(e)
                    {
                        console.log(e);
                        resolve(0);
                    }
            }
        })
    })
}

module.exports.Email = loginEmail;
module.exports.User  = loginUser;
module.exports.verifyAcc = validTokenVerif;
module.exports.validToken = validTokenReset;
module.exports.Reset = resetPass;
module.exports.getToken = getToken;