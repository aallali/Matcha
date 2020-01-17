function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
 /*An array containing all the city names in Morocco:*/
var cities = ["Ain Harrouda","Ben Yakhlef","Bouskoura","Casablanca","Médiouna","Mohammadia","Tit Mellil","Ben Yakhlef","Bejaâd","Ben Ahmed","Benslimane","Berrechid","Boujniba","Boulanouare","Bouznika","Deroua","El Borouj","El Gara","Guisser","Hattane","Khouribga","Loulad","Oued Zem","Oulad Abbou","Oulad H'Riz Sahel","Oulad M'rah","Oulad Saïd","Oulad Sidi Ben Daoud","Ras El Aïn","Settat","Sidi Rahhal Chataï","Soualem","Azemmour","Bir Jdid","Bouguedra","Echemmaia","El Jadida","Hrara","Ighoud","Jamâat Shaim","Jorf Lasfar","Khemis Zemamra","Laaounate","Moulay Abdallah","Oualidia","Oulad Amrane","Oulad Frej","Oulad Ghadbane","Safi","Sebt El Maârif","Sebt Gzoula","Sidi Ahmed","Sidi Ali Ban Hamdouche","Sidi Bennour","Sidi Bouzid","Sidi Smaïl","Youssoufia","Fès","Aïn Cheggag","Bhalil","Boulemane","El Menzel","Guigou","Imouzzer Kandar","Imouzzer Marmoucha","Missour","Moulay Yaâcoub","Ouled Tayeb","Outat El Haj","Ribate El Kheir","Séfrou","Skhinate","Tafajight","Arbaoua","Aïn Dorij","Dar Gueddari","Had Kourt","Jorf El Melha","Kénitra","Khenichet","Lalla Mimouna","Mechra Bel Ksiri","Mehdia","Moulay Bousselham","Sidi Allal Tazi","Sidi Kacem","Sidi Slimane","Sidi Taibi","Sidi Yahya El Gharb","Souk El Arbaa","Akka","Assa","Bouizakarne","El Ouatia","Es-Semara","Fam El Hisn","Foum Zguid","Guelmim","Taghjijt","Tan-Tan","Tata","Zag","Marrakech","Ait Daoud","Amizmiz","Assahrij","Aït Ourir","Ben Guerir","Chichaoua","El Hanchane","El Kelaâ des Sraghna","Essaouira","Fraïta","Ghmate","Ighounane","Imintanoute","Kattara","Lalla Takerkoust","Loudaya","Lâattaouia","Moulay Brahim","Mzouda","Ounagha","Sid L'Mokhtar","Sid Zouin","Sidi Abdallah Ghiat","Sidi Bou Othmane","Sidi Rahhal","Skhour Rehamna","Smimou","Tafetachte","Tahannaout","Talmest","Tamallalt","Tamanar","Tamansourt","Tameslouht","Tanalt","Zeubelemok","Meknès‎","Khénifra","Agourai","Ain Taoujdate","MyAliCherif","Rissani","Amalou Ighriben","Aoufous","Arfoud","Azrou","Aïn Jemaa","Aïn Karma","Aïn Leuh","Aït Boubidmane","Aït Ishaq","Boudnib","Boufakrane","Boumia","El Hajeb","Elkbab","Er-Rich","Errachidia","Gardmit","Goulmima","Gourrama","Had Bouhssoussen","Haj Kaddour","Ifrane","Itzer","Jorf","Kehf Nsour","Kerrouchen","M'haya","M'rirt","Midelt","Moulay Ali Cherif","Moulay Bouazza","Moulay Idriss Zerhoun","Moussaoua","N'Zalat Bni Amar","Ouaoumana","Oued Ifrane","Sabaa Aiyoun","Sebt Jahjouh","Sidi Addi","Tichoute","Tighassaline","Tighza","Timahdite","Tinejdad","Tizguite","Toulal","Tounfite","Zaouia d'Ifrane","Zaïda","Ahfir","Aklim","Al Aroui","Aïn Bni Mathar","Aïn Erreggada","Ben Taïeb","Berkane","Bni Ansar","Bni Chiker","Bni Drar","Bni Tadjite","Bouanane","Bouarfa","Bouhdila","Dar El Kebdani","Debdou","Douar Kannine","Driouch","El Aïoun Sidi Mellouk","Farkhana","Figuig","Ihddaden","Jaâdar","Jerada","Kariat Arekmane","Kassita","Kerouna","Laâtamna","Madagh","Midar","Nador","Naima","Oued Heimer","Oujda","Ras El Ma","Saïdia","Selouane","Sidi Boubker","Sidi Slimane Echcharaa","Talsint","Taourirt","Tendrara","Tiztoutine","Touima","Touissit","Zaïo","Zeghanghane","Rabat","Salé","Ain El Aouda","Harhoura","Khémisset","Oulmès","Rommani","Sidi Allal El Bahraoui","Sidi Bouknadel","Skhirate","Tamesna","Témara","Tiddas","Tiflet","Touarga","Agadir","Agdz","Agni Izimmer","Aït Melloul","Alnif","Anzi","Aoulouz","Aourir","Arazane","Aït Baha","Aït Iaâza","Aït Yalla","Ben Sergao","Biougra","Boumalne-Dadès","Dcheira El Jihadia","Drargua","El Guerdane","Harte Lyamine","Ida Ougnidif","Ifri","Igdamen","Ighil n'Oumgoun","Imassine","Inezgane","Irherm","Kelaat-M'Gouna","Lakhsas","Lakhsass","Lqliâa","M'semrir","Massa (Maroc)","Megousse","Ouarzazate","Oulad Berhil","Oulad Teïma","Sarghine","Sidi Ifni","Skoura","Tabounte","Tafraout","Taghzout","Tagzen","Taliouine","Tamegroute","Tamraght","Tanoumrite Nkob Zagora","Taourirt ait zaghar","Taroudannt","Temsia","Tifnit","Tisgdal","Tiznit","Toundoute","Zagora","Afourar","Aghbala","Azilal","Aït Majden","Beni Ayat","Béni Mellal","Bin elouidane","Bradia","Bzou","Dar Oulad Zidouh","Demnate","Dra'a","El Ksiba","Foum Jamaa","Fquih Ben Salah","Kasba Tadla","Ouaouizeght","Oulad Ayad","Oulad M'Barek","Oulad Yaich","Sidi Jaber","Souk Sebt Oulad Nemma","Zaouïat Cheikh","Tanger‎","Tétouan‎","Akchour","Assilah","Bab Berred","Bab Taza","Brikcha","Chefchaouen","Dar Bni Karrich","Dar Chaoui","Fnideq","Gueznaia","Jebha","Karia","Khémis Sahel","Ksar El Kébir","Larache","M'diq","Martil","Moqrisset","Oued Laou","Oued Rmel","Ouazzane","Point Cires","Sidi Lyamani","Sidi Mohamed ben Abdallah el-Raisuni","Zinat","Ajdir‎","Aknoul‎","Al Hoceïma‎","Aït Hichem‎","Bni Bouayach‎","Bni Hadifa‎","Ghafsai‎","Guercif‎","Imzouren‎","Inahnahen‎","Issaguen (Ketama)‎","Karia (El Jadida)‎","Karia Ba Mohamed‎","Oued Amlil‎","Oulad Zbair‎","Tahla‎","Tala Tazegwaght‎","Tamassint‎","Taounate‎","Targuist‎","Taza‎","Taïnaste‎","Thar Es-Souk‎","Tissa‎","Tizi Ouasli‎","Laayoune‎","El Marsa‎","Tarfaya‎","Boujdour‎","Awsard","Oued-Eddahab","Stehat","Aït Attab"];
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
var tagsA = []
  $.post('/editprofile/tags/all', function(row){
 
    row.forEach(el=>{
    
      tagsA.push(el.tag)
    })
   

})

  if(document.getElementById("locationInput") !== null)
  autocomplete(document.getElementById("locationInput"), countries);

  if(document.getElementById("typetag") !== null)
  autocomplete(document.getElementById("typetag"), tagsA);

  if(document.getElementById("typetag1") !== null)
  autocomplete(document.getElementById("typetag1"), tagsA);

  if(document.getElementById("city") !== null)
  autocomplete(document.getElementById("city"), cities);

  if(document.getElementById("country") !== null)
  autocomplete(document.getElementById("country"), countries);