
var tags = [];
var tagsF = [];
var count = 1;
var tagDiv = document.getElementById('tagsD');
var tagDivF = document.getElementById('tagsD1');

function removeme(e)
{
  if(tags.length != 1)
  {
    if($('#saveTag').is(":hidden"))
    $('#saveTag').slideToggle('slow');
    tags.splice( tags.indexOf(e), 1 );
    count--;
    document.getElementById(e).parentNode.removeChild(document.getElementById(e));
  }
}

function removeme1(e)
{
    tagsF.splice( tagsF.indexOf(e), 1 );
    count--;
    document.getElementById(e).parentNode.removeChild(document.getElementById(e));
}

function isExists(tag)
{
if(tags.indexOf(tag) == -1)
    return true;
else
    return false;
}
function isExistsF(tag)
{
if(tagsF.indexOf(tag) == -1)
    return true;
else
    return false;
}

function addTagF(e)
{   

if(count <= 7){
    if(isExistsF(e.toLowerCase())){
        
        tagsF.push(e.toLowerCase());
        var element = document.createElement("div");
        var text = document.createElement("p");
        text.setAttribute('style', '')
        text.appendChild(document.createTextNode("#"+e));
        element.appendChild(text);
        element.setAttribute("onclick", 'removeme1("'+e+'")');
        element.setAttribute('id', e)
        element.style = "background-color:#51ada3;position:relative;font-weight: bold;border-radius:5px;color:white; border: 0px solid white;margin-top:5px;margin-bottom: 5px;height:30px;width: auto;padding:1px 5px 1px 5px;float: left;margin-left:5px";
        tagDivF.appendChild(element);
        count++;
    }
}
}


function addTag(e)
{   

if(count <= 7){
    if(isExists(e.toLowerCase())){
        
        tags.push(e.toLowerCase());
        var element = document.createElement("div");
        var text = document.createElement("p");
        text.setAttribute('style', '')
        text.appendChild(document.createTextNode("#"+e));
        element.appendChild(text);
        element.setAttribute("onclick", 'removeme("'+e+'")');
        element.setAttribute('id', e)
        element.style = "background-color:#51ada3;position:relative;font-weight: bold;border-radius:5px;color:white; border: 0px solid white;margin-top:5px;margin-bottom: 5px;height:30px;width: auto;padding:1px 5px 1px 5px;float: left;margin-left:5px";
        tagDiv.appendChild(element);
        count++;
     
    }
}
}
function isAlphaNum(tag)
{
    var regex = /^[a-z0-9]+$/i;
    return(regex.test(tag))
}
$('#saveTag').on('click', function(){
    if(count == 8)
        $('#saveTag').slideToggle('slow');
    var i =0;
    var tmp = [];
    while(i < tags.length)
    {
        tmp.push(tags[i++]);
    }
    
    if(tmp[1] == undefined)
    tmp[1] = '';
    if(tmp[2] == undefined)
    tmp[2] = '';
    if(tmp[3] == undefined)
    tmp[3] = '';
    if(tmp[4] == undefined)
    tmp[4] = '';
    if(tmp[5] == undefined)
    tmp[5] = '';
    if(tags[6] == undefined)
    tmp[6] = '';

    $.post('/editprofile/tags/add', {tag0: tmp[0], tag1: tmp[1], tag2: tmp[2], tag3: tmp[3], tag4: tmp[4], tag5: tmp[5], tag6: tmp[6]}, function(row){
        if(row == 'Access Blocked!')
        location.reload();
       
        })


})
if(tagDiv != null)
{

    $.post('/editprofile/tags/', function(row){
        if(row == '0')
        {
        }
        else
        {
            row.forEach(el=>{
                addTag(el.tag);
             })
        }
     
    })
}

$('#typetag').on('keyup change', function(e) {
    var tag = $(this).val();
    var len = tag.length;
    var tug = '';

    if(tag[len - 1] == ',')
    {
        tug = tag.substring(0, tag.length - 1);
        if(isAlphaNum(tug) && tug.length >= 3 && tug.length <= 13)
        {
            if($('#saveTag').is(":hidden"))
            $('#saveTag').slideToggle('slow');
            addTag(tug);
            $(this).val('');
        }
    }
  return e.metaKey || // cmd/ctrl
    e.which <= 0 || // arrow keys
    e.which == 8 || // delete key
    /[0-9]/.test(String.fromCharCode(e.which)); // numbers

})

$('#typetag1').on('keyup change', function(e) {
    var tag = $(this).val();
    var len = tag.length;
    var tug = '';

    if(tag[len - 1] == ',')
    {
        tug = tag.substring(0, tag.length - 1);
        if(isAlphaNum(tug) && tug.length >= 3 && tug.length <= 13)
        {
            addTagF(tug);
            $(this).val('');
        }
    }
  return e.metaKey || // cmd/ctrl
    e.which <= 0 || // arrow keys
    e.which == 8 || // delete key
    /[0-9]/.test(String.fromCharCode(e.which)); // numbers

})
