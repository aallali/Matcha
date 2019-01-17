
var express = require('express');
var router = express.Router();


const jwt   = require('jsonwebtoken');
const info  = require('../helper/persoProfile.js');
const Album = require('../helper/album');
const rate  = require('../helper/rating');
const Like  = require('../helper/like');
const Block = require('../helper/block');
const Notif = require('../helper/notification');
const report = require('../helper/report');

//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET profile page. */
router.get('/', async function(req, res, next) {

  const token = req.cookies.ATTK
 
  var id = 0;
  if (typeof token !== 'undefined') {
          id = jwt.verify(token, 'snake', (err, user) => {
                  if (err)
                  return res.redirect('/')
                  else if(user.stat == 4)
                          return 'incom';
                          else
                          return user.id
          })
  }
  else
  return res.redirect('/')

  if(id == 'incom')
  return res.redirect('/home');
  else
  if (id != 0) {
          var data = (await info.About(id))[0];
          data.me = 1;
          var tags = await info.Tags(id);
          data .fame = await rate.Fame(id);
        data.likes = await Like.Total(id);
          if (tags.length != 0)
                  data.tags = tags;
          var pdp = await Album.PDP(id);
          if (pdp != 0)
                  data.pdp = pdp;
          var album = await Album.Album(id);
          if (album != 0)
                  data.album = album;
  } else
          var data = "Access Blocked!";
  res.render('profile', {
          data: data
  });
})
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET profile page. */
router.get('/:user', async function(req, res, next) {

  const token = req.cookies.ATTK
 
  var id1 = 0;
  if (typeof token !== 'undefined') {
          id1 = jwt.verify(token, 'snake', (err, user) => {
                  if (err)
                          return 0;
                  else
                          return user.id
          })
  }
 if(id1 == req.params.user)
 return res.redirect('/profile');
 else if(id1 == 0)
 return res.redirect('/');
 else
 {
  if (req.params.user != 0 && parseInt(req.params.user)) {
          id = req.params.user;
          if(await Block.isBlocked(id1, id) == 1)
          return res.redirect('/profile');
          else{
                  var online = await info.online(id);
           
                if(online.online == 1)
                online = "<h3 color='color:green'>Online</h3>"
                else
                {
                        if(online == 0)
                        online = "<h3 color='color:red'>Offline - last seen : 14 days ago </h3>";
                        else
                        online = "<h3 color='color:red'>Offline - last seen : "+moment(online.time)+"</h3>";

                }


                  var data = (await info.About(id))[0];
                 
                if(typeof data !== 'undefined')
                {
                        await Notif.New(id1, id, 3);
                        
                        var tags = await info.Tags(id);
                        var pdp = await Album.PDP(id);
                        var album = await Album.Album(id);

                        data.me = 0;
                        data .fame = await rate.Fame(id);
                        data.liked = await Like.HeLikeHim(id1, id)
                        data.likes = await Like.Total(id);
                        data.online = online;
                        if (tags.length != 0)
                        data.tags = tags;
        
                        if (pdp != 0)
                        data.pdp = pdp;
                        
                        if (album != 0)
                          data.album = album;
                          data.nstars = await rate.get_rate_by(id1, id);
                
                }
                else
                return res.redirect('/profile')
          }

      
  } else
          var data = "Access Blocked!";
  res.render('profile', {
          data: data
  });
 }
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST profile_LIKE_USER . */
router.post('/like', async function(req, res, next) {

        const token = req.cookies.ATTK
       
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                        return res.sendStatus(200)
                        else
                        return user.id
                })
        }
        else
        return res.sendStatus(200)
      
        if (id != 0) {
                if(await Block.isBlocked(id, req.body.id) == 1)
                {
                        return res.send('Block')   
                }
                else
                {

                        await  Like.New(id, req.body.id);
                        await Notif.New(id, req.body.id, 1);
                        if(await Like.isMatch(id, req.body.id) == 1)
                        {
                                await Notif.New(id, req.body.id, 4);
                                await Notif.New(req.body.id, id, 4);
                                return res.send('Match')   
                        }
                        else
                        return res.sendStatus(200)
                }

        } 
           
      })
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/history', async function(req, res, next) {
        const token = req.cookies.ATTK
       
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                        return res.sendStatus(200)
                        else
                        return user.id
                })
                if (id != 0) {
                        if(await Block.isBlocked(id, req.body.id) == 1)
                        {
                                return res.send('Block')   
                        }
                        else
                        {
                                
                        var list = await Like.List(req.body.id);
                        return res.send({list})
                        }
        
                } 
        }
        else
        return res.sendStatus(200)     
      })
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST profile_RATE_USER . */
router.post('/rate', async function(req, res, next) {

        const token = req.cookies.ATTK
       
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                        return res.sendStatus(200)
                        else
                        return user.id
                })
        }
        else
        return res.sendStatus(200)
      
        if (id != 0 && parseInt(req.body.id) > 0 && parseInt(req.body.rate)) {
               
                if(await Block.isBlocked(id, parseInt(req.body.id)) == 1)
                {
                        return res.send('Block')   
                }
                else
                { 
                        await Notif.New(id, parseInt(req.body.id), 5);
                        await  rate.New(id,  parseInt(req.body.id), parseInt(req.body.rate));
                        return res.sendStatus(200)
                }

        } 
           
      })
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST profile_DisLIKE_USER . */
router.post('/dislike', async function(req, res, next) {

        const token = req.cookies.ATTK
       
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                        return res.sendStatus(200)
                        else
                                return user.id
                })
        }
        else
        return res.sendStatus(200)
      
        if (id != 0) {
                await  Like.Dislike(id, req.body.id);
                await Notif.New(id, req.body.id, 2);
        } 
        return res.sendStatus(200)      
      })
//##############################################################################################
//##############################################################################################
//##############################################################################################
 /* POST profile_block_USER . */
router.post('/block', async function(req, res, next) {

        const token = req.cookies.ATTK
       
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                        return res.sendStatus(200)
                        else
                                return user.id
                })
        }
        else
        return res.sendStatus(200)
      
        if (id != 0) {
               
                await  Block.New(id, req.body.id);
                await Like.Dislike(id, req.body.id);
                await Like.Dislike(req.body.id, id);
                await Notif.Clear(id, req.body.id);
                await Notif.Clear(req.body.id, id);
        } 
        return res.sendStatus(200)      
      })  
//##############################################################################################
//##############################################################################################
//##############################################################################################    
 /* POST profile_block_USER . */
 router.post('/report', async function(req, res, next) {

        const token = req.cookies.ATTK
       
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                        return res.sendStatus(200)
                        else
                                return user.id
                })
        }
        else
        return res.sendStatus(200)
      
        if (id != 0) {
               
try{
await report.New(id, parseInt(req.body.id));
}catch(e)
{

}
        } 
        return res.sendStatus(200)      
      })  
module.exports = router;
//##############################################################################################
//##############################################################################################
//##############################################################################################
function moment(s) {
        if (s < 60)
            return (s + " seconds ago")
        else if (s < 60 * 60)
            return ((Math.floor(s / 60) == 1) ? (Math.floor(s / 60) + " minute ago") : (Math.floor(s / 60) + " minutes ago"))
        else if (s < 60 * 60 * 24)
            return ((Math.floor(s / (60 * 60)) == 1) ? (Math.floor(s / (60 * 60)) + " hour ago") : (Math.floor(s / (60 * 60)) + " hours ago"))
        else if (s < 60 * 60 * 24 * 30)
            return (Math.floor(s / (60 * 60 * 24)) + "days ago")
        }
//##############################################################################################
//##############################################################################################
//##############################################################################################


// async function asyncForEach(array, callback) {
//         for (let index = 0; index < array.length; index++) {
//             await callback(array[index], index, array);
//         }
//     }
//     const start = async () => {
//         await asyncForEach(ids, async (el) => {
         

//         })

//         return true;
//     }
//     await start();  