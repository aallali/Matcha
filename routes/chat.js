var express = require('express');
var router = express.Router();

const jwt      = require('jsonwebtoken');
const matche   = require('../helper/like');
const chat     = require('../helper/chat');
const Block    = require('../helper/block');

/* GET home page. */
router.get('/',function(req, res, next) {
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
    jwt.verify(token, 'snake', async (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.redirect('/')
      }
      else{
        if(user.stat == 4)
        return res.redirect('/editprofile');
        else
        {
          var name =  await chat.MyName(user.id);
          name[0]['likes'] = (await matche.Total(user.id));
 
          return res.render('chat', {name})

        }
      }
res
  })
  }
  else
return res.redirect('/');

});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET home page. */
router.get('/matches', async function(req, res, next) {
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
    jwt.verify(token, 'snake', async (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.send('KO')
      }
      else{
        if(user.stat == 4)
        return res.send('KO')
        else
        {
          try{
            var data = await matche.Matches(user.id);
            var match = []
            const start = async () => {
              await asyncForEach( data, async (el) => {
                var info  = await matche.info_match(el.liked);
                info.push(await chat.unReadConv(el.liked,user.id));
                match.push(info);
             
              })
              return match;
          }
          res.send(await start())  
          }
          catch(e)
          {
            res.send('KO');
          }
     
        }
      }
  })
  }
  else
  return res.redirect('/')

});
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/send', async (req, res, next)=>{
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
   var id = jwt.verify(token, 'snake', async (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.send('KO');
      }
      else{
        if(user.stat == 4)
        return res.send('KO');
        else
        {
          try{
            if(await Block.isBlocked(user.id,req.body.id) != 1)
            if(typeof req.body.msg === 'string' && req.body.msg.trim().length > 0 && req.body.msg.trim().length  < 5000 && /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(req.body.msg) == false)
            await chat.New(user.id, req.body.id,  escapeHtml(req.body.msg));
          }catch(e)
          {
            console.log(e);
          }
          res.send("OK");
        }
      }

  })
  }
})
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/fetchConv', async (req, res, next)=>{
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
   var id = jwt.verify(token, 'snake', async (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.send('KO');
      }
      else{
        if(user.stat == 4)
        return res.send('KO');
        else
        {
          try{
            var data = []
            data.push(await chat.MyName(user.id));
            
        
            var msgs = await chat.fetchConv(user.id+""+req.body.id, req.body.id+""+user.id)
            await chat.Vue(req.body.id,user.id);
        
            data.push(msgs);
          }catch(e)
          {
            var data = "Blank";
          }
          res.send(data);
        }
      }
  })
  }
})
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.get('/unreadchat', async (req, res, next)=>{
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
   var id = jwt.verify(token, 'snake', async (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.send('KO');
      }
      else{
        if(user.stat == 4)
        return res.send('KO');
        else
        {
          try{
            var data = []
           var nb = await chat.unReadTotal(user.id);
           
            data.push(nb);
          }catch(e)
          {
            var data = "Blank";
          }
          res.send(data);
        }
      }
  })
  }
})
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.get('/online', async  (req, res, next) => {
  const token = req.cookies.ATTK
  if (typeof token !== 'undefined'){
   var id = jwt.verify(token, 'snake', async (err, user) => {
      if (err) {
          res.cookie('ATTK', '', {enabled: true, httpOnly: true, secure: false, maxAge: 0});
          return res.send('KO');
      }
      else{
        if(user.stat == 4)
        return res.send('KO');
        else
        {
          try{
            var data = await matche.Matches(user.id);
            const start = async () => {
              await asyncForEach( data, async (el) => {
               
                var pic  = await matche.info_match(el.liked);
                var online = await chat.Online(el.liked);
                el.pic = pic[0].name;
                el.online = online;
         
             
              })
              return data;
          }
          data = await start();
        }catch(e)
        {
          var data = "Blank";
        }
        res.send(data);
      }
    }
  })
}
else
return res.redirect('/');
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) {
    return map[m];
  });
}
module.exports = router;
