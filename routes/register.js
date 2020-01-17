var express = require('express');
var router = express.Router();
var crypto      = require('crypto');
var bcrypt      = require('bcrypt');
var salt          = bcrypt.genSaltSync(10);
var user = require('../helper/register');
var validation = require('../helper/validation');
 var cities = ["Aïn Harrouda","Ben Yakhlef","Bouskoura","Casablanca","Médiouna","Mohammadia","Tit Mellil","Ben Yakhlef","Bejaâd","Ben Ahmed","Benslimane","Berrechid","Boujniba","Boulanouare","Bouznika","Deroua","El Borouj","El Gara","Guisser","Hattane","Khouribga","Loulad","Oued Zem","Oulad Abbou","Oulad H'Riz Sahel","Oulad M'rah","Oulad Saïd","Oulad Sidi Ben Daoud","Ras El Aïn","Settat","Sidi Rahhal Chataï","Soualem","Azemmour","Bir Jdid","Bouguedra","Echemmaia","El Jadida","Hrara","Ighoud","Jamâat Shaim","Jorf Lasfar","Khemis Zemamra","Laaounate","Moulay Abdallah","Oualidia","Oulad Amrane","Oulad Frej","Oulad Ghadbane","Safi","Sebt El Maârif","Sebt Gzoula","Sidi Ahmed","Sidi Ali Ban Hamdouche","Sidi Bennour","Sidi Bouzid","Sidi Smaïl","Youssoufia","Fès","Aïn Cheggag","Bhalil","Boulemane","El Menzel","Guigou","Imouzzer Kandar","Imouzzer Marmoucha","Missour","Moulay Yaâcoub","Ouled Tayeb","Outat El Haj","Ribate El Kheir","Séfrou","Skhinate","Tafajight","Arbaoua","Aïn Dorij","Dar Gueddari","Had Kourt","Jorf El Melha","Kénitra","Khenichet","Lalla Mimouna","Mechra Bel Ksiri","Mehdia","Moulay Bousselham","Sidi Allal Tazi","Sidi Kacem","Sidi Slimane","Sidi Taibi","Sidi Yahya El Gharb","Souk El Arbaa","Akka","Assa","Bouizakarne","El Ouatia","Es-Semara","Fam El Hisn","Foum Zguid","Guelmim","Taghjijt","Tan-Tan","Tata","Zag","Marrakech","Ait Daoud","Amizmiz","Assahrij","Aït Ourir","Ben Guerir","Chichaoua","El Hanchane","El Kelaâ des Sraghna","Essaouira","Fraïta","Ghmate","Ighounane","Imintanoute","Kattara","Lalla Takerkoust","Loudaya","Lâattaouia","Moulay Brahim","Mzouda","Ounagha","Sid L'Mokhtar","Sid Zouin","Sidi Abdallah Ghiat","Sidi Bou Othmane","Sidi Rahhal","Skhour Rehamna","Smimou","Tafetachte","Tahannaout","Talmest","Tamallalt","Tamanar","Tamansourt","Tameslouht","Tanalt","Zeubelemok","Meknès‎","Khénifra","Agourai","Ain Taoujdate","MyAliCherif","Rissani","Amalou Ighriben","Aoufous","Arfoud","Azrou","Aïn Jemaa","Aïn Karma","Aïn Leuh","Aït Boubidmane","Aït Ishaq","Boudnib","Boufakrane","Boumia","El Hajeb","Elkbab","Er-Rich","Errachidia","Gardmit","Goulmima","Gourrama","Had Bouhssoussen","Haj Kaddour","Ifrane","Itzer","Jorf","Kehf Nsour","Kerrouchen","M'haya","M'rirt","Midelt","Moulay Ali Cherif","Moulay Bouazza","Moulay Idriss Zerhoun","Moussaoua","N'Zalat Bni Amar","Ouaoumana","Oued Ifrane","Sabaa Aiyoun","Sebt Jahjouh","Sidi Addi","Tichoute","Tighassaline","Tighza","Timahdite","Tinejdad","Tizguite","Toulal","Tounfite","Zaouia d'Ifrane","Zaïda","Ahfir","Aklim","Al Aroui","Aïn Bni Mathar","Aïn Erreggada","Ben Taïeb","Berkane","Bni Ansar","Bni Chiker","Bni Drar","Bni Tadjite","Bouanane","Bouarfa","Bouhdila","Dar El Kebdani","Debdou","Douar Kannine","Driouch","El Aïoun Sidi Mellouk","Farkhana","Figuig","Ihddaden","Jaâdar","Jerada","Kariat Arekmane","Kassita","Kerouna","Laâtamna","Madagh","Midar","Nador","Naima","Oued Heimer","Oujda","Ras El Ma","Saïdia","Selouane","Sidi Boubker","Sidi Slimane Echcharaa","Talsint","Taourirt","Tendrara","Tiztoutine","Touima","Touissit","Zaïo","Zeghanghane","Rabat","Salé","Ain El Aouda","Harhoura","Khémisset","Oulmès","Rommani","Sidi Allal El Bahraoui","Sidi Bouknadel","Skhirate","Tamesna","Témara","Tiddas","Tiflet","Touarga","Agadir","Agdz","Agni Izimmer","Aït Melloul","Alnif","Anzi","Aoulouz","Aourir","Arazane","Aït Baha","Aït Iaâza","Aït Yalla","Ben Sergao","Biougra","Boumalne-Dadès","Dcheira El Jihadia","Drargua","El Guerdane","Harte Lyamine","Ida Ougnidif","Ifri","Igdamen","Ighil n'Oumgoun","Imassine","Inezgane","Irherm","Kelaat-M'Gouna","Lakhsas","Lakhsass","Lqliâa","M'semrir","Massa (Maroc)","Megousse","Ouarzazate","Oulad Berhil","Oulad Teïma","Sarghine","Sidi Ifni","Skoura","Tabounte","Tafraout","Taghzout","Tagzen","Taliouine","Tamegroute","Tamraght","Tanoumrite Nkob Zagora","Taourirt ait zaghar","Taroudannt","Temsia","Tifnit","Tisgdal","Tiznit","Toundoute","Zagora","Afourar","Aghbala","Azilal","Aït Majden","Beni Ayat","Béni Mellal","Bin elouidane","Bradia","Bzou","Dar Oulad Zidouh","Demnate","Dra'a","El Ksiba","Foum Jamaa","Fquih Ben Salah","Kasba Tadla","Ouaouizeght","Oulad Ayad","Oulad M'Barek","Oulad Yaich","Sidi Jaber","Souk Sebt Oulad Nemma","Zaouïat Cheikh","Tanger‎","Tétouan‎","Akchour","Assilah","Bab Berred","Bab Taza","Brikcha","Chefchaouen","Dar Bni Karrich","Dar Chaoui","Fnideq","Gueznaia","Jebha","Karia","Khémis Sahel","Ksar El Kébir","Larache","M'diq","Martil","Moqrisset","Oued Laou","Oued Rmel","Ouazzane","Point Cires","Sidi Lyamani","Sidi Mohamed ben Abdallah el-Raisuni","Zinat","Ajdir‎","Aknoul‎","Al Hoceïma‎","Aït Hichem‎","Bni Bouayach‎","Bni Hadifa‎","Ghafsai‎","Guercif‎","Imzouren‎","Inahnahen‎","Issaguen (Ketama)‎","Karia (El Jadida)‎","Karia Ba Mohamed‎","Oued Amlil‎","Oulad Zbair‎","Tahla‎","Tala Tazegwaght‎","Tamassint‎","Taounate‎","Targuist‎","Taza‎","Taïnaste‎","Thar Es-Souk‎","Tissa‎","Tizi Ouasli‎","Laayoune‎","El Marsa‎","Tarfaya‎","Boujdour‎","Awsard","Oued-Eddahab","Stehat","Aït Attab"];
var  sendMail = require('../helper/mails.js');

//##############################################################################################
//##############################################################################################
//##############################################################################################
/* GET register page. */
router.get('/', function(req, res, next) {
  res.redirect('/')
});
//##############################################################################################
//##############################################################################################
//##############################################################################################
/* POST register page. */
router.post('/', async function(req, res, next) {

   var msg = "";
     var form = req.body['form[]']

    if(typeof form === 'undefined')
    {
        msg = 'Something Wrong ! Please Try Later';
    }
    else if(form.length  == 8)
    {
      if(validation.isDefined(form[0].trim(), form[1].trim(), form[2].trim(), form[3].trim(), form[4].trim(), form[5].trim(), form[6].trim(), form[7].trim()))
     {
       if(await user.emailTaken(form[2].trim()) == 1 || await user.usernameTaken(form[3].trim()) == 1)
       {
        if(await user.emailTaken(form[2].trim()) == 1 )
          msg = "Email Taken !";
        if(await user.usernameTaken(form[3].trim()) == 1)
          msg = msg + " && Username taken !"
       }
       else
       {
        var gender = (parseInt(form[6].trim()) == 1) ? 'male' : 'female';
        
        if(cities.indexOf(form[7].trim()) != -1)
        country = 'Morocco'
        else
        country = await user.ApiCountry(form[7].trim());
       if(country !== 0)
        {
          msg = "Account registred successfully, You need to verify your account Now ! (check your E-Mail inbox)";
         var token = crypto.randomBytes(10).toString('hex');
         var password = bcrypt.hashSync(form[4].trim(), salt);
  
         try {
          await user.register(form[3].trim(), form[2].trim(), form[0].trim(), form[1].trim(),  form[5].trim(), gender, form[7].trim(), country, password, token);
         }
         catch(e)
         {
           console.log(e)
           msg = "Something Went Wrong, Please Try Again !";
         }

         try{
          var link = 'http://10.12.12.4:3000/login/verif/' + token;
          sendMail.Verif(link, form[0].trim(), form[2].trim());
         }
         catch(e)
         {
         console.log(e);
         }
        }
        else
        msg = "Invalid City !";
       }
     }
      else
      msg = 'Not Valid';
    }
    else
    msg = 'not complete';

    res.send(msg);
  });
//##############################################################################################
//##############################################################################################
//##############################################################################################
module.exports = router;




