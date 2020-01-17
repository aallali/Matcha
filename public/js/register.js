function formData()
{
    var fname = $('#firstname').val();
    var lname = $('#lastname').val();
    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var age = parseInt($('#age').val());
    var gender = parseInt($("input[name='gender']:checked").val());
    var city = $('#city').val();
    var data = new Array();
    data.push(fname, lname, email, username, password, age, gender, city);
    return (data);
}
// ##########################################################################
// ##########################################################################
$('#firstname').on('keyup', function(){
  if(validname($('#firstname').val()) == true)
  $('#firstname').css('border', 'solid 1px green')
  else
  $('#firstname').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################
$('#lastname').on('keyup', function(){
  if(validname($('#lastname').val()) == true)
  $('#lastname').css('border', 'solid 1px green')
  else
  $('#lastname').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################
$('#username').on('keyup', function(){
  if(ValidateUsername($('#username').val()) == true)
  $('#username').css('border', 'solid 1px green')
  else
  $('#username').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################
$('#email').on('keyup', function(){
  console.log(ValidateEmail($('#email').val()), $('#email').val())
  if(ValidateEmail($('#email').val()) == true)
  $('#email').css('border', 'solid 1px green')
  else
  $('#email').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################
$('#password').on('keyup', function(){
  if(ValidatePass($('#password').val()) == true)
  $('#password').css('border', 'solid 1px green')
  else
  $('#password').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################
$('#age').on('change', function(){
  if(ValidAge($('#age').val()) == true)
  $('#age').css('border', 'solid 1px green')
  else
  $('#age').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################
$('#city').on('change', function(){
  console.log(validCity($('#city').val()))
  if(validCity($('#city').val()) == true)
  $('#city').css('border', 'solid 1px green')
  else
  $('#city').css('border', 'solid 1px red')
})
// ##########################################################################
// ##########################################################################

// ##########################################################################
// ##########################################################################

// ##########################################################################
// ##########################################################################
function  registerPost(data)
{
  $.post('/register',{'form': data}, function(data)
  {
    $(error).html(data);
  })
  return false
}

$('#register1').on('click', function(){
  if(validname($('#firstname').val()) && validname($('#lastname').val()) && ValidateUsername($('#username').val()) && ValidateEmail($('#email').val()) && ValidatePass($('#password').val()))
  registerPost(formData());
  else
  $(error).html('please fill form correctly')
})
