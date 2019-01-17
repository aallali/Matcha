var nodemailer = require('nodemailer');
var Gemail = 'your@email.com';
var Gpassword =  'your.Passw0rd';
function resetMailMsg(token, username)
{
    var resetMail = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Password Reset</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        /** Google webfonts for cross-client compatibility */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
              url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
              url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        table {
          border-collapse: collapse !important;
        }
        a {
          color: #1a82e2;
        }
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
      </style>
    </head>
    <body style="background-color: #e9ecef;">
      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
      </div>
      <!-- end preheader -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="http://10.12.12.4:3000/" target="_blank" style="display: inline-block;">
                    <img src="https://www.aucegypt.edu/sites/default/files/inline-images/Benefits%20Icon.png" alt="Logo" border="0" width="300" style="display: block; width: 300px; max-width: 300px; min-width: 48px;">
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- end logo -->
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password For ${username}'s ACCOUNT</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- end hero -->
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.</p>
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                  <a href="http://10.12.12.4:3000/reset/${token}" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #1a82e2;">CHANGE MY PASSWORD</a>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  <p style="margin: 0;"><a href="http://10.12.12.4:3000/reset/${token}">http://10.12.12.4:3000/reset/${token}</a></p>
                </td>
              </tr>
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf;">
                  <p style="margin: 0;">Cheers,<br> aallali, akamel</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
    
    return (resetMail)
}
function msgcompose(link, name) {
    var verifMail = '<div style="margin: 0; padding: 0; font-family:\'sans-serif\';color:#6e6e6e;">' +
        ' <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        '  <tr>' +
        '   <td>' +
        '      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">' +
        '     <tr>' +
        '      <td align="left" bgcolor="#3498DB" style="padding: 30px 0 30px 30px;color: #ffffff;font-weight: 700;font-size:24px;font-family: \'sans-serif\';letter-spacing: 7px;">' +
        '       CONFIRMATION MAIL' +
        '      </td>' +
        '     </tr>' +
        '     <tr>' +
        '      <td bgcolor="#f2f2f2" style="padding: 40px 30px 40px 30px;">' +
        '        <!-- content area -->' +
        '          <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        '             <tr>' +
        '               <td align="center" style="padding-bottom:20px;color: #04B45F;font-size:24px;font-weight:900px;">' +
        '                1 step away from the heaven of TITIZ' +
        '               </td>' +
        '              </tr>' +
        '            <tr>' +
        '   <td align="center">' +
        '    <img src="https://lh3.googleusercontent.com/e32QLv_H4fsEE9ztnxkbRFQogySH-vMp4MiIxp_NC4tpFiPLB2vfNHrpGqeGY0Lyzg=w300">' +
        '   </td>' +
        '  </tr>' +
        '  <tr>' +
        '   <td style="padding-top:50px;">' +
        '    Hi,' +
        '   </td>' +
        '  </tr>' +
        '  <tr>' +
        '   <td style="padding-top:20px;">' +
        '    Welcome !' +
        '   </td>' +
        '  </tr>' +
        '  <tr>' +
        '   <td style="padding-top:20px;">' +
        '    Thank you for joining us ' + name + '.Your account is confirmed. You now have access to login.' +
        '   </td>' +
        '  </tr>' +
        '  <tr>' +
        '   <td style="padding-top:10px;">' +
        '     You may now sign in,' +
        '   </td>' +
        '  </tr>' +
        '   <tr>' +
        '   <td align="center" style="padding-top:20px;">' +
        '     <a href="' + link + '" style="padding: 10px 25px;background-color: #3498DB;color: #ffffff; border:none;border-radius:4px;display:block;width:200px;text-align:center;text-decoration:none;">CLICK ME</a>' +
        '   </td>' +
        '  </tr>     ' +
        '   <tr>' +
        '   <td style="padding-top:20px;">' +
        '    If you have any questions or concerns please reach out to your dedicated Universum contact, or email us any time at <a href="http://10.12.12.4:3000/" style="color:#3498DB;">aallali.online@gmail.com</a> if you have technical issues.' +
        '   </td>' +
        '  </tr>' +
        '  <tr>' +
        '   <td style="padding-top:20px;">' +
        '    Best Regards,' +
        '   </td>' +
        '  </tr>' +
        '  <tr>' +
        '   <td>' +
        '    1337-MATCHA Team' +
        '   </td>' +
        '  </tr>' +
        ' </table>' +
        '        <!-- content area ends  -->' +
        '      </td>' +
        '     </tr>' +
        '        <tr>' +
        '      <td bgcolor="#2A2F43" style="padding: 20px 10px ">' +
        '       <!-- footer area -->' +
        '        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        '       <tr>' +
        '        <td style="color:#ffffff;font-size:12px;">' +
        '         © 2019 All Rights Reserved To MATCHA (UNICORN COMPANY)' +
        '        </td>' +
        '        <td align="right">' +
        '          <table border="0" cellpadding="0" cellspacing="0">' +
        '  <tr>' +
        '   <td>' +
        '    <a href="https://www.twitter.com/allaliabdullah">' +
        '     <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/twitter_circle_color-256.png" alt="Twitter" width="38" height="38" style="display: block;" border="0" />' +
        '    </a>' +
        '   </td>' +
        '   <td style="font-size: 0; line-height: 0;" width="20"> </td>' +
        '   <td>' +
        '    <a href="https://www.facebook.com/allaliabdullah">' +
        '     <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" alt="Facebook" width="38" height="38" style="display: block;" border="0" />' +
        '    </a>' +
        '   </td>' +
        '  </tr>' +
        ' </table>' +
        '        </td>' +
        '       </tr>' +
        '      </table>' +
        '       <!-- footer ends -->' +
        '      </td>' +
        '     </tr>' +
        '    </table>' +
        '   </td>' +
        '  </tr>' +
        ' </table>' +
        '</body>';

    return verifMail;
}

function sendVerifMail(link, name, email) {
    var msg = msgcompose(link, name);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Gemail,
            pass: Gpassword
        }
    });

    var mailOptions = {
        from: '1337 Matcha',
        to: email,
        subject: 'VERIFICATION mail (MATCHA)',
        html: msg

    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



function sendRestMail(email, token, username) {
    var msg = resetMailMsg(token, username)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Gemail,
            pass: Gpassword
        }
    });

    var mailOptions = {
        from: '1337 Matcha',
        to: email,
        subject: 'RESET PASSWORD (MATCHA)',
        html: msg

    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports.Verif = sendVerifMail;
module.exports.Reset = sendRestMail;