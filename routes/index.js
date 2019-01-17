var express = require('express');
var router = express.Router();
var validation = require('../helper/validation');
var  sendMail = require('../helper/mails.js');
var user = require('../helper/login');
var crypto      = require('crypto');
var bcrypt      = require('bcrypt');
var salt          = bcrypt.genSaltSync(10);
const jwt      = require('jsonwebtoken');
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET home page. */
router.get('/', function(req, res, next) {
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
    jwt.verify(token, 'snake', (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.redirect('/home')
      }
      else{
        if(user.stat == 4)
        return res.redirect('/editprofile');
        else
        return res.redirect('/home')
      }

  })
  }
else
{
    var error = '';
  // console.log(req.query.error)
  // if(req.query.error)
  // error =  req.query.error;
  return res.render('index', {error: error});
}
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET Reset page. */
router.get('/reset/:token', async function(req, res, next) {
  try{
  if(!validation.Token(req.params.token))
  res.redirect('/');
  else if(await user.validToken(req.params.token) == 0)
  {
    res.redirect('/?error='+"Invalid Token or Expired, apply for a new one");
  }
  else
  {
    res.render('resetPass');
  } 
}
catch(e)
{
  res.send('error, please try again (#1337)');
}
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* Post RESET page. */
router.post('/reset', async function(req, res, next) {
  if(validation.Email(req.body.email))
  {
    res.send("If this email have an account in MATCHA , he will receive a mail with the reset link.");
    try{
      var info = await user.getToken(req.body.email.trim());
    if(info !== 0)
      sendMail.Reset(req.body.email, info.token, info.username)
  }
  catch(e)
  {
    console.log(e);
  }
  }
  else
  {
    res.send("Invalid Email Format");
  }
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* Post RESET/Password page. */
router.post('/reset/pass', async function(req, res, next) {
var msg = "";

if(typeof req.body.pass !== undefined && typeof req.body.token !== undefined)
  { 
    if(!validation.Pass(req.body.pass) || !validation.Token(req.body.token))
    msg = "Invalid Input";
    else if(await user.validToken(req.body.token) == 0)
      msg= "Invalid Token, Please Apply for a new one";
      else
      {
        try{
          var token = crypto.randomBytes(10).toString('hex');
          var id = await user.validToken(req.body.token);
          var password = bcrypt.hashSync(req.body.pass, salt);
          user.Reset(id.id, password, token);
          msg="Password changed successfully";
        }
        catch(e)
        {
          console.log(e);
          msg="Something Wrong, Please Try later!";
        }
      } 
  }
else
msg = "Invalid Input.";
  res.send(msg);
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET Logout page. */
router.get('/logout', function(req, res, next) {
  res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
  res.redirect('/');
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET PERSO_Info page. */
router.get('/myinf', function(req, res, next) {
  const token = req.cookies.ATTK;
  if (typeof token !== 'undefined'){
    jwt.verify(token, 'snake', (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.send('Fail');
      }
      else{
        return res.send({tok: token, id: user.id});
      }

  })
  }
else
{
  return res.send('Fail');
}
});
//##############################################################################################
//##############################################################################################
//##############################################################################################



module.exports = router;
