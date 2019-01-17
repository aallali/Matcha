var express = require('express');
var router = express.Router();
const jwt      = require('jsonwebtoken');
const info = require('../helper/persoProfile.js')
const Album = require('../helper/album');
const fetch = require('../helper/fetch_profiles')
const Tags = require('../helper/tags');
const Like = require('../helper/like');
const Notification = require('../helper/notification.js');
const validation = require('../helper/validation');
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET home page. */
router.get('/', async function(req, res, next) {
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
                if (user.id != 0) {
                        var data = (await info.About(user.id))[0];
                        var pdp = await Album.PDP(user.id);
                        if (pdp != 0)
                                data.pdp = pdp;
                } else
                        var data = "Access Blocked!";

                        res.render('home', {
                                data: data
                        });
        }
      }

  })
  }
else
{
        return res.redirect('/')
}
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.get('/likedlist', async function(req, res, next) {
        const token = req.cookies.ATTK
        var id = 0;
        if (typeof token !== 'undefined') {
                id = jwt.verify(token, 'snake', (err, user) => {
                        if (err)
                                return res.redirect('/')
                        else
                                return user.id
                })
        } else
                return res.redirect('/')
        if (id != 0) {
                try{
                        var data = await Like.List(id);
                if(data == 0)
                data = "ZERO"
                }
                catch(e)
                {
                      data = "Error Please try later!"  
                }
        } else
                var data = "Access Blocked!";
        res.send(data);
});   
//##############################################################################################
//##############################################################################################
//##############################################################################################
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST Fetch_ALL page. */
router.post('/all', async function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined') {
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
      return res.redirect('/')
      else
      return user.id
    })
  } else
  return res.redirect('/')
  if (id != 0) {
var newD = [];
sort =' ORDER BY users.age,fame.fame, km ';
var sexpref = await fetch.get_sex_pref(id)
if(sexpref == 0)
gend = '1 = 1';
else if(sexpref == 2)
gend = " gender = 'male' ";
else
gend = " gender = 'female' ";

    data = await fetch.All(id, gend ,'1 = 1', 4, 5, parseInt(await fetch.get_age(id)) - 2,  100, 0, 1000, sort ,0, 20);
   if(data == 0|| data.length < 2)
   newD = "0";
   else{
        const start = async () => {
                await asyncForEach(data, async (el) => {
                   el.tags = await Tags.fetch(el.id);

                })
                return newD;
        }   //
   await start();

}
}
else
data = "0";

if(data == 0)
data = "No data";

//console.log(data);
res.send(data);
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/filtre', async function(req, res, next) {
        const token = req.cookies.ATTK
        if (typeof token !== 'undefined') {
          var id = jwt.verify(token, 'snake', (err, user) => {
            if (err)
            {
               res.send('KO')
               return 0;
            }
           
            else
            return user.id
          })
        } else
        return res.send('KO1')
if(id != 0)
{
        var filtre= req.body['data[]'];
        if(typeof filtre[0] === 'undefined' || 
        typeof filtre[1] === 'undefined' || 
        typeof filtre[2] === 'undefined' || 
        typeof filtre[3] === 'undefined' || 
        typeof filtre[4] === 'undefined' || 
        typeof filtre[5] === 'undefined' || 
        typeof filtre[6] === 'undefined' || 
        typeof filtre[7] === 'undefined')
        data = "KO2";
        else
        {
                if(parseInt(filtre[0]) < 16 || parseInt(filtre[0]) > 100 ||
                parseInt(filtre[1]) < 16 || parseInt(filtre[1]) > 100 ||
                parseInt(filtre[2]) < 0 || parseInt(filtre[2]) > 5 ||
                parseInt(filtre[3]) < 0 || parseInt(filtre[3]) > 5 ||
                parseInt(filtre[4]) < 0 || parseInt(filtre[4]) > 1000 ||
                parseInt(filtre[5]) < 0 || parseInt(filtre[5]) > 1000 ||
                (parseInt(filtre[6]) != 1 && parseInt(filtre[6]) != 2 && parseInt(filtre[6]) != 3 )||
                (parseInt(filtre[7]) != 1 && parseInt(filtre[7]) != 2 && parseInt(filtre[7]) != 3  && parseInt(filtre[7]) != 4))
                data = "KO3";
                else{
        
                        if(typeof req.body['tags[]'] !== 'undefined')
                        {
                                var tag = "";
                                var tags = req.body['tags[]'];
                               if(tags.length > 1)
                                { 
                               if(Array.isArray(tags))
                               {
                                tags.forEach(el =>{
                                           if(validation.Tag(el));
                                        tag = tag + " tags.tag = '"+el + "' OR "
                                })
                                tag = tag + " 1 = 2 "
        
                               }
                                else
                                {
                                       if (validation.Tag(tags))
                                       tag = tag + " tags.tag = '"+tags + "'";
                                       else
                                       tag  = " 1 = 2 ";
                                }
        
                                }
                                if(parseInt(filtre[6]) == 1)
                                gender = " gender = 'male'"
                                else if(parseInt(filtre[6]) == 2)
                                gender = " gender = 'female'"
                                else
                                gender = " 1 = 1 "
                                
                                if(parseInt(filtre[7]) == 1)
                                sort = ' ORDER BY fame.fame DESC ';
                                else if(parseInt(filtre[7]) == 2)
                                sort = ' ORDER BY users.age ';
                                else if(parseInt(filtre[7]) == 3)
                                sort = ' ORDER BY km ';
                                else if(parseInt(filtre[7]) == 4)
                                sort = ' ORDER BY users.gender  DESC';
        
                                data = await fetch.All(id, gender, tag, parseInt(filtre[2]), parseInt(filtre[3]), parseInt(filtre[0]), parseInt(filtre[1]), parseInt(filtre[4]), parseInt(filtre[5]), sort ,req.body.offset, req.body.limit)
                                const start = async () => {
                                        await asyncForEach(data, async (el) => {
                                           el.tags = await Tags.fetch(el.id);
                                        })
                                        return ;
                                }   //
                           await start();
                        }
                        else{
                                if(parseInt(filtre[6]) == 1)
                                gender = " gender = 'male'"
                                else if(parseInt(filtre[6]) == 2)
                                gender = " gender = 'female'"
                                else
                                gender = " 1 = 1 "
        
                                if(parseInt(filtre[7]) == 1)
                                sort = ' ORDER BY fame.fame  DESC ';
                                else if(parseInt(filtre[7]) == 2)
                                sort = ' ORDER BY users.age ';
                                else if(parseInt(filtre[7]) == 3)
                                sort = ' ORDER BY km ';
                                else if(parseInt(filtre[7]) == 4)
                                sort = ' ORDER BY users.gender DESC ';
        
        
                                data = await fetch.All(id, gender, 'tags.tag  != "1"', parseInt(filtre[2]), parseInt(filtre[3]), parseInt(filtre[0]), parseInt(filtre[1]), parseInt(filtre[4]), parseInt(filtre[5]), sort ,req.body.offset, req.body.limit)
                                const start = async () => {
        
                                        await asyncForEach(data, async (el) => {
                                             
                                           el.tags = await Tags.fetch(el.id);               
                                        })
                                        return ;
                                }   //
                           await start();
                        }
                } 
        }
        
                res.send(data);
}
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST  Notification_Fetch_ALL page. */
router.get('/notif', async function(req, res, next) {
        const token = req.cookies.ATTK
        var id = 0;
        if (typeof token !== 'undefined') {
          id = jwt.verify(token, 'snake', (err, user) => {
            if (err)
            return res.redirect('/')
            else
            return user.id
          })
        } else
        return res.redirect('/')

       var notifs = await Notification.Fetch(id);
       res.send(notifs);
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.get('/unreadNotif', async (req, res, next) =>{
        const token = req.cookies.ATTK
        var id = 0;
        if (typeof token !== 'undefined') {
          id = jwt.verify(token, 'snake', (err, user) => {
            if (err)
            return res.redirect('/')
            else
            return user.id
          })
        } else
        return res.redirect('/')

        var nb = await Notification.Unread(id);
        res.send({nb: nb});
       

})
//##############################################################################################
//##############################################################################################
//##############################################################################################
module.exports = router;
