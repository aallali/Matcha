var socket = io();
$.get('/myinf', (row)=>{

    socket.on("connect",function(){


     });
     socket.on("disconnect",function(){
        location.reload();
     });
     socket.emit('login', row.tok);
     socket.on('notif'+row.id, function(msg){
         if(msg.tos[1] == 1)
         creat_like_notif(msg.tos[0])
         else if (msg.tos[1] == 2)
         creat_Dislike_notif(msg.tos[0])
         else if (msg.tos[1] == 3)
         creat_visit_notif(msg.tos[0])
         else if (msg.tos[1] == 5)
         creat_rate_notif(msg.tos[0])
     // remove saved socket from users object
     });
     socket.on('chat'+row.id, function(msg){
       if(isNaN(parseInt($('.unreadmsg').html())))
       $('.unreadmsg').html('1');
       else
       $('.unreadmsg').html(parseInt($('.unreadmsg').html()) + 1);

        creat_message_notif();
        });
   
   
     
        // remove saved socket from users object
        

})


// ################################################################################################
// ################################################################################################
function creat_match_notif()
{
    var tdi = Math.floor(Math.random() * Math.floor(1337));
    var notif =         
    '<div id="'+tdi+'" class="alert alert-success alert-dismissible" onclick="removNotif(this)" style="border-radius: 0px">'+
   ' <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
    '<strong>MATCHE !</strong> You have a new Match, just now ! , go check it out !'+
 ' </div>';
 var newD = $(notif).hide();
 $('#popUpNotif').prepend(newD);
 newD.slideDown();
 setTimeout(function(){
    $('#'+tdi).slideUp();
  }, 4000);
}
function creat_message_notif()
{
    var tdi = Math.floor(Math.random() * Math.floor(1337));
    var notif =         
    '<div  id="'+tdi+'" class="alert alert-warning alert-dismissible '+tdi+'" onclick="removNotif(this)" style="border-radius: 0px">'+
   ' <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
    '<strong>MESSAGE !</strong> You have a new message, just now ! , go check it out !'+
 ' </div>';
 var newD = $(notif).hide();
 $('#popUpNotif').prepend(newD);
 newD.slideDown();
 setTimeout(function(){
    $('#'+tdi).slideUp();
  }, 4000);
}

function creat_like_notif(name)
{
    var tdi = Math.floor(Math.random() * Math.floor(1337));

    var notif =         
    '<div class="alert alert-info alert-dismissible '+tdi+'" onclick="removNotif(this)" style="border-radius: 0px">'+
   ' <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
    '<strong>Notification : </strong> You have a new like from '+name+
 ' </div>';
 var newD = $(notif).hide();
 $('#popUpNotif').prepend(newD);
 newD.slideDown();
 setTimeout(function(){
    $('.'+tdi).slideUp();
  }, 4000);
}
function creat_rate_notif(name)
{
    var tdi = Math.floor(Math.random() * Math.floor(1337));

    var notif =         
    '<div class="alert alert-warning alert-dismissible '+tdi+'" onclick="removNotif(this)" style="border-radius: 0px">'+
   ' <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
    '<strong>Notification : </strong> You have a new rate from '+name+
 ' </div>';
 var newD = $(notif).hide();
 $('#popUpNotif').prepend(newD);
 newD.slideDown();
 setTimeout(function(){
    $('.'+tdi).slideUp();
  }, 4000);
}

function creat_visit_notif(name)
{
    var tdi = Math.floor(Math.random() * Math.floor(1337));

    var notif =         
    '<div class="alert alert-success alert-dismissible '+tdi+'" onclick="removNotif(this)" style="border-radius: 0px">'+
   ' <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
    '<strong>Notification : </strong> You got a new visit to your profile from  '+name+
 ' </div>';
 var newD = $(notif).hide();
 $('#popUpNotif').prepend(newD);
 newD.slideDown();
 setTimeout(function(){
    $('.'+tdi).slideUp();
  }, 4000);
}

function creat_Dislike_notif(name)
{
    var tdi = Math.floor(Math.random() * Math.floor(1337));

    var notif =         
    '<div class="alert alert-danger alert-dismissible '+tdi+'" onclick="removNotif(this)" style="border-radius: 0px">'+
   ' <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
    '<strong>Notification : </strong> '+name+ ' removed his/her like from your profile, sorry to hear that !'+
 ' </div>';
 var newD = $(notif).hide();
 $('#popUpNotif').prepend(newD);
 newD.slideDown();
 setTimeout(function(){
    $('.'+tdi).fadeOut();
  }, 4000);
}


// ################################################################################################
// ################################################################################################

function likeUser(id)
{
    var tos = []
    tos.push(id);
    tos.push(1);

    socket.emit('notif',tos);
    $.post('/profile/like', {id}, (row) =>{
      
       if(row == 'Match')
       creat_match_notif()
       else if(row == 'Block')
       {
        setTimeout(function(){
            window.location.reload();
          });
       }
        getResult(offset+limit, 1);
        offset++;
    })

    
    return false;
}
function UnLike(e) {
  
    $(e).parents('.follow-user').slideUp("slow");
    var id = $(e).parents('.follow-user').attr('like');
    $.post('/profile/dislike', {id})
    var tos = []
    tos.push(id);
    tos.push(2);

    socket.emit('notif',tos);
    return false;
}

function Profile_Like(id)
{
    var tos = []
    tos.push(id);
    tos.push(1);

    socket.emit('notif',tos);
    $.post('/profile/like',{id}, (row)=>{
        if(row == 'Match')
        creat_match_notif(id)
        else if(row == 'Block')
        {
         setTimeout(function(){
             window.location.reload();
           });
        }
    })
    return false;
}
function Profile_DisLike(id) {
    var tos = []
    tos.push(id);
    tos.push(2);

    socket.emit('notif',tos);
    $.post('/profile/dislike', {id});
    return false;
}

function Profile_Block(id)
{
    $.post('/profile/block',{id}, ()=>{
        location.reload();
    })

    return false;
}
function Profile_Report(id)
{
    $.post('/profile/report',{id}, (row)=>{
        alert("Report has been sent , thanks for participing in making MATCHA a great place for lovers");
    })

    return false;
}
function Profile_unBlock(id)
{
    $.post('/profile/unblock',{id})
    return false;
}

// ################################################################################################
// ################################################################################################

function slidProfile(e) {
   
    
    $(e).parents('.nearby-user').slideUp("slow");
    var id = $(e).parents('.nearby-user').attr('like');
    likeUser(id);

    var stop = 0;
    glob.forEach(el => {
        if (el.id == id && stop == 0) {
            stop = 1;
            var border = "";
            if (el.gender == 'male')
                border = 'style="border:solid 2px rgb(31, 118, 225)"'
            else
                border = 'style="border:solid 2px pink"'
            var myvar = '<div class="follow-user" like="' + id + '">' +
                '<img ' + border + ' src="/uploads/' + el.name + '" alt="" class="profile-photo-sm pull-left" />' +
                '<div>' +
                ' <h5><a target="_blank" class="visitNotif" href="/profile/' + el.id + '">' + el.fname + ' ' + el.lname + '</a></h5>' +
                '<img style="margin-top:-10px;margin-bottom:0px" height="25" width="25" src="/images/dislike.png" onclick="UnLike(this)">' +
                ' </div>' +
                '  </div>';
            var newD = $(myvar).hide();
            $('#sticky-sidebar').prepend(newD);
            newD.slideDown();
            return;
        }
    })
    $(e).attr("disabled", true);
    }

