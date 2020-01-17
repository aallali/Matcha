var stopWarn = 0;
function test() {
    var data = new Array();
    var minAge;
    var maxAge;
    var minFame;
    var maxFame;
    var minDist;
    var maxDist;
    var gender;
    var sort;

    if ($('#ageCh').is(":checked") === false) {
        minAge = 16;
        maxAge = 100;
    } else {
        minAge = parseInt($('#bs-slider-2')[0].value.split(',')[0]);
        maxAge = parseInt($('#bs-slider-2')[0].value.split(',')[1]);
    }
    if ($('#distCh').is(":checked") === false) {
        minDist = 0;
        maxDist = 1000;
    } else {
        minDist = parseInt($('#bs-slider-4')[0].value.split(',')[0]);
        maxDist = parseInt($('#bs-slider-4')[0].value.split(',')[1]);
    }
    if ($('#fameCh').is(":checked") === false) {
        minFame = 0;
        maxFame = 5;
    } else {
        minFame = parseInt($('#bs-slider-3')[0].value.split(',')[0]);
        maxFame = parseInt($('#bs-slider-3')[0].value.split(',')[1]);
    }

    sort = parseInt($("input[name='sortBy']:checked").val());
    gender = parseInt($("input[name='gender']:checked").val());
    data.push(minAge);
    data.push(maxAge);
    data.push(minFame);
    data.push(maxFame);
    data.push(minDist);
    data.push(maxDist);
    data.push(gender);
    data.push(sort);

    if ($('#tagCh').is(":checked") === false) {
        data.push([]);
    } else {
        data.push(tagsF);
    }

    return data;
}

var limit  = 20;
var pos = [];
var stop = 0;

function getResult(offset, limit)
{
    var data = test()
    $.post('/home/filtre', {
        data: data,
        tags: data[8],
        offset: offset,
        limit: limit
    }, function(row) { 
 
        if (row != 'KO') {
            row.forEach(el => {
            
                var full_name = el.fname + " " + el.lname;
                var newLoc = {
                    id: el.id,
                    lat: el.lat,
                    lon: el.lon,
                    tooltip: full_name
                }
                pos.push(newLoc);
                if (el.tags)
                    el.tags.forEach(el => {
                        tags = tags + '<span class="badge badge-primary" style="border:solid 1px black;font-size:12px;background: ' + color[i] + ';">#' + el.tag + '</span>';
                        i++;
                    })
                    i = 0;
                    
                glob.push(el);
                if (el.gender == 'male')
                    border = 'style="border:solid 3px rgb(31, 118, 225)"'
                else
                    border = 'style="border:solid 3px rgb(235, 121, 140)"'

                var myvar = '<div class="nearby-user" like="' + el.id + '">' +
                    '                      <div class="row">' +
                    '                        <div class="col-md-2 col-sm-2">' +
                    '                          <img ' + border + ' src="/uploads/' + el.name + '" alt="user" class="profile-photo-lg" />' +
                    '                        </div>' +
                    '                        <div class="col-md-7 col-sm-7">' +
                    '                          <h5><a target="_blank" onclick="notif_visit('+el.id+')" href="/profile/' + el.id + '" class="profile-link visitNotif">' + el.fname + ' ' + el.lname + '</a><b style="color:black"> (' + el.age + ')&nbsp;&nbsp; [<b style="color:#27aae1;font-size:17px">' + el.fame + '</b><b style="font-size:20px;color:">&#10025;</b>]</b> </h5>' +
                    '                          <p>' + tags + '</p>' +
                    '                          <p class="text-muted">' + el.city + '/' + el.country + ' ' + parseInt(el.km) + ' KM away</p>' +
                    '                        </div>' +
                    '                        <div class="col-md-3 col-sm-3">' +
                    '                          <button class="btn btn-primary pull-right" onclick="slidProfile(this)">Like</button>' +
                    '                        </div>' +
                    '                      </div>' +
                    '                    </div>';
                
                var newD = $(myvar).hide();
                $('#profiles').append(newD);
                newD.slideDown();
                tags = ''

            });


       if(stop < 10)
       new Mapkick.Map("map", pos);
             stop++; 
            $('#spinner-wrapper').fadeOut();
        } else {
            if(stopWarn == 0)
            $('#profiles').append("<h1 style='color:green'>No result Found for this search , try something else :) </h1>");
            stopWarn = 1;
            $('#spinner-wrapper').fadeOut();
        }



    })
}
$('#search').on('click', function() {
    glob = [];
    offset = 0;
    stopWarn = 0;
    $('#profiles').html("");
    $('#filtreHid').click();
    $('#profiles').html("<h1>Loading Profiles, Please Wait ...</h1>");
  
    $('#sticky-sidebar').prepend('<div id="spinner-wrapper">' +
        '<div class="spinner"></div>' +
        '   </div>');
        $('#profiles').html("");
        getResult(0, limit);
        offset = offset + limit;
})
function notif_visit(id)
{
    var tos = []
    tos.push(id);
    tos.push(3);
    socket.emit('notif',tos);
}