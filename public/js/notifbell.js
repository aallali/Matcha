$(document).ready(function () {
    $(".notification0").click(function () {
      $(this).toggleClass("open");
      $("#notificationMenu").toggleClass("open");
      $(".notification0").css('z-index', '400');
      appendNotifs();
    });

    $('.seeall').on('click', function(){
        $("#notificationMenu").toggleClass("open");
        $(".notification0").css('z-index', '1000');
    })
  });
  