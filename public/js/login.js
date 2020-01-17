


$('#loginBtn').on('click', function(){
    var login = $('#my-email').val();
    var password = $('#my-password').val();
    var form = new Array;
    form.push(login, password);
    $.post('/login', {form}, function(row){
        if(row.localeCompare('OK') == 0)
        location.reload();
        else
        $('#errorLogin').html(row);
    })
})

$('#forgotBtn').on('click', function(){
    if($('#forgotBtn').html().localeCompare('Forgot Password?') == 0)
    $('#forgotBtn').html('Login');
    else
    $('#forgotBtn').html('Forgot Password?');
    
    if($('#login h3').html().localeCompare('Login') == 0)
    $('#login h3').html('Reset  Password');
    else
    $('#login h3').html('Login');


    if($('#login p').first().html().localeCompare('Log into your account') == 0)
    $('#login p').first().html('Reset Your password with your email');
    else
    $('#login p').first().html('Log into your account');

    $('#Login_form').slideToggle( "slow");
    $('#loginBtn').slideToggle( "slow");
    $('#resetDiv').slideToggle( "slow");
})

$('#resetBtn').on('click', function(){
    var email = $('#emailReset').val();
    $.post('/reset', {email:email}, function(row){
       $('#errorReset').html(row);
    })
})
