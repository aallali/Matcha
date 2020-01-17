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
$('#my-password').keyup(function(){
    if(!ValidatePass($('#my-password').val()))
    {
        $('#resetBtn').prop('disabled', true);
        $('#my-password').css("border", "solid 1px red");
    }
    else
    {      
        $('#my-password').css("border", "solid 1px green");

        if($('#my-Cpassword').val() === $('#my-password').val())
        $('#resetBtn').prop('disabled', false);
        else
        {
            $('#my-Cpassword').css("border", "solid 1px red");
            $('#resetBtn').prop('disabled', true);
        }
    }
  
})

$('#my-Cpassword').keyup(function(){
    if($('#my-Cpassword').val() === $('#my-password').val())
    {
        if(ValidatePass($('#my-password').val()))
        $('#resetBtn').prop('disabled', false);
        else
        $('#resetBtn').prop('disabled', true);

        $('#my-Cpassword').css("border", "solid 1px green");
    }
    else
    {
        $('#resetBtn').prop('disabled', true);
        $('#my-Cpassword').css("border", "solid 1px red");
    }
})
$('#resetBtn').on('click', function(){
   var path  = window.location.href;
   path = path.split('/reset/');
   path = path[1];
   console.log(path);
    var pass = $('#my-password').val();
    $.post('/reset/pass', {pass: pass, token: path}, function(row){
       $('#errorReset').html(row);
    })
    
})