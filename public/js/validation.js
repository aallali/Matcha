function validname(name)
{
  if (/^[A-Za-z]+$/.test(name) && name.length >= 3 && name.length <= 10)
  {
    return (true)
  }
  else{
    return false
  }
}

function validBio(bio)
{
  if(typeof bio === 'undefined')
  return false;
  if (/^[a-zA-Z0-9,.!? ]+$/.test(bio) && bio.length >= 20 && bio.length <= 300)
  {
    return (true)
  }
  else{
    return false
  }
}

function ValidateUsername(user)
{
  if (/^[A-Za-z0-9]+$/.test(user) && user.length >= 3 && user.length <= 15)
  {
    return (true)
  }
  else{
    return false
  }
}
function ValidateEmail(mail) 
{
  if(typeof mail === 'undefined')
  return (false)
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  else{
    return false
  }
}
function ValidateAge(age) 
{
if(isNaN(age) || age === 'undefined')
return false;
else if(parseInt(age) < 16 || parseInt(age) > 100)
return false;
else
return true;

}
function ValidateGender(gender) 
{
if(isNaN(gender) || gender === 'undefined')
return false;
else if(parseInt(gender) != 0 && parseInt(gender) != 1)
return false;
else
return true;

}
function ValidAge(age)
{
  if(typeof age === 'undefined')
  return false
  else if(/^[0-9]+$/.test(age) && parseInt(age) > 15 && parseInt(age) < 101)
  return true
  else
  return false

}

function validCity(city)
{
  if(typeof city === 'undefined')
  return false;
  else if (/^[a-zA-Zèé\u00C0-\u017F0-9 -',]+$/.test(city) && city.length > 0 && city.length < 50)
  return true
  else
  return false

}

function validCountry(ctry)
{
  
  if(typeof ctry === 'undefined')
  return false;
  else if (/^[A-Za-z0-9 '-,]+$/.test(ctry) && ctry.length > 1 &&  ctry.length < 100)
  return true
  else
  return false

}

function ValidateSexPref(sp)
{
  
  if(typeof sp === 'undefined')
  return false
  else if(/^[0-9]+$/.test(sp) && (parseInt(sp) === 0 ||  parseInt(sp) === 1 ||  parseInt(sp) === 2))
  return true
  else
  return false
}
function ValidatePass(pass) 
{
 if (/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20}))/.test(pass))
  {
    return (true)
  }
  else{
    return false
  }
}

function ValidateToken(token) 
{
  if (/^[A-Za-z0-9]+$/.test(token) && token.length > 8 && token.length < 100)
  {
    return (true)
  }
  else{
    return false
  }
}

function ValidateTag(tug) 
{
  var tag = tug.toLowerCase()
  if(typeof tag === 'undefined')
  return (false)
  if (/^[a-z0-9]+$/i.test(tag) && tag.length >=3 && tag.length <= 13)
  {
    return (true)
  }
  else{
    return (false)
  }
}
