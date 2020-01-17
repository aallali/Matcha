var express     = require('express');
var router      = express.Router();
var info        = require('../helper/persoProfile.js')
const jwt       = require('jsonwebtoken');
const valid     = require('../helper/validation');
const update    = require('../helper/updateInfo');
const ApiLoc    = require('../helper/register');
const check     = require('../helper/check');
const tag       = require('../helper/tags');
const multer    = require('multer');
const path      = require('path');
const album     = require('../helper/album');
const Like      = require('../helper/like');
const block     = require('../helper/block');
const statistics= require('../helper/statistics')
var mmm         = require('mmmagic'),
    Magic       = mmm.Magic;
var magic       = new Magic(mmm.MAGIC_MIME_TYPE);
const fs        = require('fs');

//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET home page. */
router.get('/', function(req, res, next) {
  const token = req.cookies.ATTK

  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return res.redirect('/');
      else
      res.render('edit_profile');

  })
}
else
return res.redirect('/');
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST get about informations of the logged user page. */
router.post('/getInfo', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
  if(id != 0){
  var data = await info.About(id);
  data[0].nlikes = await Like.Total(id);
  }
  else
  var data = "Access Blocked!";

  res.send(data);
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST modification about infos for logged user page. */
router.post('/about', async function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}

if(id != 0)
{
  var data = req.body['data[]'];
  var msg = "-"
  var error = ''
  try{
    if(typeof data === 'undefined')
    res.send('invalid');
    else if(data === null)
    res.send('invalid');
    else if(data.length != 10)
    res.send('invalid');
    else
    {
      if(!valid.User(data[0]) || !valid.name(data[1]) || !valid.name(data[2]) || !valid.Email(data[3]) || !valid.Age(data[4]) || !valid.Gender(data[5]) || !valid.SexPref(data[6]) || !valid.City(data[7]) || !valid.Ctry(data[8]) || !valid.Bio(data[9]))
      {
        if(!valid.User(data[0]))
        error = error + ' User | ';
        if(!valid.name(data[1]))
        error = error + ' Fisrt Name | ';
        if(!valid.name(data[2]))
        error = error + ' Last Name | ';
        if(!valid.Email(data[3]))
        error = error + ' Email | ';
        if(!valid.Age(data[4]))
        error = error + ' Age | ';
        if(!valid.Gender(data[5]))
        error = error + ' Gender | ';
        if(!valid.SexPref(data[6]))
        error = error + ' Sex Preference | ';
        if(!valid.City(data[7]))
        error = error + ' City/Address | ';
        if(!valid.Ctry(data[8]))
        error = error + ' Country | ';
        if(!valid.Bio(data[9]))
        error = error + ' Biography | ';
        return res.send('invalid Form Data for the following inputs => ' + error);
      }
      else
      {
        var cntry = await ApiLoc.ApiCountry(data[7])
        var city = await ApiLoc.ApiCity(data[7])
        if(cntry === 0 || city === 0)
        msg = msg + ' This Address Cant Be located, Please write it correctly';
        else{
        if(await check.email(data[3].trim()) == 1 || await check.user(data[0].trim()) == 1)
        {
         if(await check.email(data[3].trim(), id) == 1 )
           msg = msg + " Email Taken !";
         if(await check.usern(data[0].trim(), id) == 1)
           msg = msg + " | Username taken !"
        }
        else{
          await update.Fname(data[1], id);
          await update.Lname(data[2], id);
          await update.Username(data[0], id);
          await update.Email(data[3], id);
          await update.Age(data[4],id);
          if(parseInt(data[5]) == 0)
          await update.Gender('male',id);
          else
          await update.Gender('female',id); 
          await update.SexPref(data[6],id);
          await update.City(id, city);
          await update.Country(id, cntry);
          await update.Bio(data[9],id);
         var geo = await ApiLoc.LatLoc(data[7]);
          await update.Loc(id, geo.lat, geo.lng)
          // await update.Stat1(id);
          var stat =  await update.Stat(id);
          var com = '';
          if(stat.indexOf('1') == -1)
          {
            com = stat+'1';
            await update.Stat1(com, id);
          }
          
          msg = 'done';
        }
      }
  
      }
      res.send(msg);  
    }
   
  }
    catch(e){
  res.send('Something Wrong Please Try later');
    }
}
else
res.send('KO');
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST fetch tags of the logged user page. */
router.post('/tags', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
else
res.send("Forbidden Access (#1337-team)");

if(await tag.fetch(id) == 0)
res.send("0");
else
res.send(await tag.fetch(id));
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST Fetch all tags for autocomplete page. */
router.post('/tags/all', async  function(req, res, next) {
res.send(await tag.All());
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST add  tags for a logged user page. */
router.post('/tags/add', async  function(req, res, next) {
  var data = "Clear";
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
  if(id == 0)
  data = "Access Blocked!";
  else
  {
    try{
    if(typeof req.body.tag0 === 'undefined' || typeof req.body.tag1 === 'undefined' || typeof req.body.tag2 === 'undefined' || typeof req.body.tag3 === 'undefined'|| typeof req.body.tag4 === 'undefined'|| typeof req.body.tag5 === 'undefined')
    data = 'Invalid Form';
    else if(req.body.tag0 == null)
    {
      data = 'Invalid Form';
    }
    else
    {
      var tags = []
      tags.push(req.body.tag0, req.body.tag1, req.body.tag2, req.body.tag3, req.body.tag4, req.body.tag5, req.body.tag6);
      function addTags()
      {
        return new Promise(async function(resolve, reject){
          var i  = 0;
          await tags.forEach(async function(el){

          if(valid.Tag(el))
          if(await tag.Exists(el, id) == 1)
          await tag.Add(el, id)
          i++;
          if(i == 7)
          resolve(0);
        })
      });
      }
      await addTags();
      var stat =  await update.Stat(id);
      var com = '';
      if(stat.indexOf('2') == -1)
      {
        com = stat+'2';
        await update.Stat1(com, id);
      }
    }
  }catch(e)
  {
    res.send("This request is rejected (#1337-team)");
  }
  }
  res.send(data);
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/album', async  function(req, res, next) {

  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
if(await album.Album(id) == 0)
res.send("0");
else
  res.send(await album.Album(id));
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST add pictures of logged user page. */
router.post('/album/add', async  function(req, res, next) {
  // Set The Storage Engine
  const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, id+'pdp' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');
// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
  if(id != 0){
  if(parseInt(await album.Count(id)) < 5)
  {
    upload(req, res, (err) => {
      if (err) {
          res.send('err')
      } else {
          if (req.file == undefined) {
            res.send('no file')
          } else {
            try{
            magic.detectFile('./public/uploads/' + req.file.filename, async function(err, result) {
              if (err)
                  console.log(err);
              else
              if (result == "image/jpeg" || result == "image/jpg" || result == "image/png" || result == "image/gif") {
                if(await album.isPdpSet(id) == 0)
              await album.Add(req.file.filename, 1, id);
              else
              await album.Add(req.file.filename, 0, id);
              var stat =  await update.Stat(id);
              var com = '';
              if(stat.indexOf('3') == -1)
              {
                com = stat+'3';
                await update.Stat1(com, id);
              }
                  res.send('Picture added successfully to your gallery')
              } else
              {
                  fs.unlinkSync('./public/uploads/' + req.file.filename);
                  res.send('Please Choose a valid picture')
              }
          });
          }catch(e)
          {
            res.send('Something Went Wrong please try again !');
          }
        }
      }
  });
  }
  else
  res.send('You reached the maximum number of picture allowed in personal album.')
}
else
res.send('Forbidden Access #1337')
}
else
{
  res.send('Forbidden Access #1337')
}
      


  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST get the _PDP_ of logged user page. */
router.post('/album/pdp', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
var pdp = await album.PDP(id);
if(pdp == 0)
res.send("0");
else
res.send(pdp);
  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST Swap Pdp pic from album of logged user page. */
router.post('/album/swap', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
try{
if(parseInt(req.body.idP) !== null)
await album.Swap(id, parseInt(req.body.idP));
res.sendStatus(200);
}catch(e)
{
  res.send("Something Wrong! Please Try later.")
}
  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST Delete a pic from album of logged user page. */
router.post('/album/delete', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
try{
  if(parseInt(await album.Count(id)) > 1)
  {
    if(parseInt(req.body.idP) !== null)
    await album.Delete(id, parseInt(req.body.idP));
  }
  res.sendStatus(200);
}catch(e)
{
  res.send("Something Wrong! Please Try later.")
}
  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/blockedlist', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}
else
res.send("Forbidden Access for this request (#1337-team)")


try{
  if(id != 0)
  {
    var list  = await block.List(id);
    res.send({list});
  }
  else
      res.send("Please try to logout then login")
}catch(e)
{
  res.send("Something Wrong! Please Try later.")
}
  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
router.post('/unblock', async  function(req, res, next) {
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}

try{
  if(id != 0)
  {
    await block.unBlock(id, parseInt(req.body.id));
    res.send("User unblocked succeffuly");
  }
  else
  res.send("Please try to logout then login")
}catch(e)
{
  res.send("Something Wrong! Please Try later.")
}
});
//##############################################################################################
//##############################################################################################
//##############################################################################################

router.post('/statistics', async  function(req, res, next){
  const token = req.cookies.ATTK
  var id = 0;
  if (typeof token !== 'undefined'){
    id = jwt.verify(token, 'snake', (err, user) => {
      if (err)
          return 0;
      else
      return user.id
  })
}

try{
  if(id != 0)
  {
    var stats = []
    stats.push(await statistics.likes_given(id)) //1
    stats.push(await statistics.likes_taken(id))//2
    stats.push(await statistics.dislikes_given(id))//3
    stats.push(await statistics.dislikes_taken(id))//4
    stats.push(await statistics.visits_given(id))//5
    stats.push(await statistics.visits_taken(id))//6
    stats.push(await statistics.matches(id))//7
    stats.push(await statistics.report_given(id))//8
    stats.push(await statistics.report_taken(id))//9
    stats.push(await statistics.block_given(id))//10
    stats.push(await statistics.block_taken(id))//11
 
res.send(stats);
  }
  else
  res.send("KO")
}catch(e)
{
  res.send("KO")
}
})
//##############################################################################################
//##############################################################################################
//##############################################################################################


module.exports = router;
