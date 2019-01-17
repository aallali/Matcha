var express = require('express');
var router = express.Router();
var userLogin = require('../helper/login');
var validation = require('../helper/validation');
const jwt      = require('jsonwebtoken');
const ipInfo = require("ipinfo");
var update = require('../helper/updateInfo');
var user = require('../helper/register');
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET LOGIN page. */
router.get('/', function(req, res, next) {
  res.redirect('/')
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET LOGIN/Verification page. */
router.get('/verif/:token', async function(req, res, next) {
   try{
       var isv = await  userLogin.verifyAcc(req.params.token);
       if(isv == 1)
       return res.render('verified');
       else
       return res.render('notverified');
   }
   catch(e)
   {
    return res.render('notverified');
   }


  });

//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST LOGIN page. */
router.post('/', async function(req, res, next) {
    // Current ip information
var info = await getLoc();
var city  = info.city
var country = await user.ApiCountry(city);


    var form = req.body['form[]'];
    if (typeof form === 'undefined' || form.length < 2)
    {
        msg = "Invalid Form";
    }
    else
    {
        if ((!validation.User(form[0]) && !validation.Email(form[0])) ||  !validation.Pass(form[1]))
        msg = "Invalid Input";
        else
        {
            msg = "Logged";

            if(validation.Email(form[0]))
            {
                var log = await userLogin.Email(form[0], form[1]);
                if(log == 1)
                msg = "No account found with this Email!";
                else if(log == 2)
                msg = "Incorrect Password.";
                else if(log == 3)
                msg = "Please verify your account";
                else if(log == 5)
                msg = "Your account has been banned due to some several reports from other users, an admin will review your account";
                else
                {
                    await update.Loc(log[1], info.loc.split(',')[0],info.loc.split(',')[1])
                    await update.City(log[1], city);
                    await update.Country(log[1], country);
                 
                    const user = {
                      
                        con: Date.now(),
                        id: log[1],
                        stat: log[0],
                        nid:log[2]
                    }
                   
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'snake');
                    res.cookie('ATTK', token, {
                    httpOnly: true,
                    maxAge: 3600000 * 3
                    })
                    msg = "OK";
                }
                
            }
            else if(validation.User(form[0]))
            {
                var log = await userLogin.User(form[0], form[1]);

                if(log == 1)
                msg = "No account found with this username !";
                else if(log == 2)
                msg = "Incorrect Password.";
                else if(log == 3)
                msg = "Please verify your account";
                else if(log == 5)
                msg = "Your account has been banned due to some several reported from other users, an admin will review your account";
                else
                {
                   try{
                    await update.Loc(log[1], info.loc.split(',')[0],info.loc.split(',')[1])
                    await update.City(log[1], city);
                    await update.Country(log[1], country);
                   }
                   catch(e)
                   {
                        console.log(e);
                        return res.send('Something wrong, Please Try again !');
                   }
                    const user = {
                       
                        con: Date.now(),
                        id: log[1],
                        stat: log[0],
                        nid:log[2]
                    }
                   
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'snake');

                res.cookie('ATTK', token, {
                    httpOnly: true,
                    maxAge: 3600000 * 3
                    })
                    msg = "OK";
                }

            }
            

        }
        
    }
    
    res.send(msg);
  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
function getLoc()
{
    return new Promise(function(resolve, reject){
        ipInfo((err, cLoc) => {
            if(err)
            reject(err);

            resolve(cLoc)
        });

    });
}
//##############################################################################################
//##############################################################################################
//##############################################################################################
module.exports = router;




