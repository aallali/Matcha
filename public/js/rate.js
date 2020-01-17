$( document ).ready(function() {

var nb = parseInt($('#nstars').val());
  var stars =  $('#stars li').parent().children('li.star');
  for (i = 0; i < stars.length; i++) {
    $(stars[i]).removeClass('selected');
  }
  
  for (i = 0; i < nb ; i++) {
    $(stars[i]).addClass('selected');
  }

  $('#msgRate').html(" You rated  "+fname + " with "  + nb + " Stars");



    /* 1. Visualizing things on Hover - See next part for action on click */
   $('#stars li').on('mouseover', function(){
     var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
    
     // Now highlight all the stars that's not after the current hovered star
     $(this).parent().children('li.star').each(function(e){
       if (e < onStar) {
         $(this).addClass('hover');
       }
       else {
         $(this).removeClass('hover');
       }
     });
     
   }).on('mouseout', function(){
     $(this).parent().children('li.star').each(function(e){
       $(this).removeClass('hover');
     });
   });
   
 
   /* 2. Action to perform on click */
   $('#stars li').on('click', function(){
   
     var onStar = parseInt($(this).data('value'), 10); // The star currently selected
     var stars = $(this).parent().children('li.star');
     var rated = $('#idrate').val();

     $.post('/profile/rate', {id: rated, rate: onStar}, (row)=>{
      var tos = []
      tos.push(rated);
      tos.push(5);
      socket.emit('notif',tos);
       if(row !== 'Block')
       $('#msgRate').html(onStar+" Stars Given to "+fname)
      else
      $('#msgRate').html("You cant rate this user, maybe he blocked you or you did!")

     })
  
 
     for (i = 0; i < stars.length; i++) {
       $(stars[i]).removeClass('selected');
     }
     
     for (i = 0; i < onStar; i++) {
       $(stars[i]).addClass('selected');
     }
     
     
     
   });
    var wdth = $( window ).width()
 if(wdth <= 990)
 {
 $('#leftPanel').appendTo('#divcol3')
 }
   $( window ).resize(function() {
 
 var wdth = $( window ).width()
 if(wdth <= 990)
 {
 $('#leftPanel').appendTo('#divcol3')
 }
 else
 $('#leftPanel').appendTo('#divcol3f')
 
 });
        });