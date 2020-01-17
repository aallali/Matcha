
$('#filtreHid').click();
var glob = [];
$(function() {
        $('#bs-slider-2').slider();
        $('#bs-slider-3').slider();
        $('#bs-slider-4').slider();   
});

$('#bs-slider-2').change(function(e) {


        var min = e.value.newValue[0];
        var max = e.value.newValue[1];
        minage = min;
        $('#leftAge').html(min + ' y.o');
        $('#rightAge').html(max + ' y.o');
        if(!$('#sortCh').is(":checked"))
        {
          $('#sortCh').click();
        }
})

$('#bs-slider-3').change(function(e) {


    var min = e.value.newValue[0];
    var max = e.value.newValue[1];

    $('#leftStar').html(min + ' Stars');
    $('#rightStar').html(max + ' Stars');
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
})

$('#bs-slider-4').change(function(e) {
    //console.log(e);
    var min = e.value.newValue[0];
    var max = e.value.newValue[1];
    $('#leftDist').html(min + ' KM');
    $('#rightDist').html(max + ' KM');
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
})

$('#ageCh').on('click', function() {
    $('#ageHid').click();
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
})
$('#fameCh').on('click', function() {
    $('#fameHid').click();
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
})
$('#distCh').on('click', function() {
    $('#distHid').click();
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
})
$('#genCh').on('click', function() {
    $('#genHid').click();
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
})
$('#tagCh').on('click', function() {
    $('#tagHid').click();
    if(!$('#sortCh').is(":checked"))
    {
      $('#sortCh').click();
    }
    

})
$('#sortCh').on('click', function() {
    $('#sortHid').click();

})
$('input[name=distLoca]').on('change', function(){
    var type = $('input[name=distLoca]:checked').val();
    if(type == 1){
      $('#locaArea').hide()
      $('#distArea').show()
    }
    else
    {
      $('#locaArea').show();
      $('#distArea').hide();
    }
    // console.log($('input[name=distLoca]:checked').val());
  })
  