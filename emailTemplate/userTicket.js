var nodemailer = require('nodemailer');

/* Email bcc */
/* For live port */
// var emailBcc = 'discover@pikanite.com, praveen@pikanite.com, emaillogger@pikanite.com';

/* For dev port */
var emailBcc = 'test@pikanite.com'

exports.ticket = function (
    bookingId,
    hotelName,
    hotelAddress,
    hotelContactNumber,
    hotelEmailForTicket,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    currentRoomSubType,
    currentRoomType,
    total,
    userName,
    userEmail,
    userContactNumber,
    discountRate,
    tax,
    promoCode,
    promoAmount,
    netPrice
    
) {
    console.log("Sending user ticket")
    var display = '';

    if (promoAmount == 0) {
        display = 'none'
    }
    else {
        display = 'bloc'
    }

    var HotelAddress = JSON.parse(hotelAddress);

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        keepBcc: true,
        auth: {
            user: 'discover@pikanite.com',
            pass: 'iamdiscover'
        },
        tls: {
            rejectUnauthorized: false //unathoutized access allow
        }
    });

    //user email
    var mailOptions = {
        from: '"Pikanite : Book With Us" <discover@pikanite.com>',
        to: `${userEmail}`,
        bcc: emailBcc,
        subject: 'Woohoo! You Booked a Great Hotel on Pikanite',
        text: 'Booking confirmation as follows',
        html: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        
        <head>
        
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
            <title>Pikanite Ticket</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <style type="text/css">
                @import url("https://fonts.googleapis.com/css?family=Varela+Round|Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i");
                .ReadMsgBody {
                    width: 100%;
                    background-color: #fff;
                }
        
                .ExternalClass {
                    width: 100%;
                    background-color: #fff;
                }
        
                body {
                    width: 100%;
                    background-color: #fff;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                    font-family: 'Varela Round', sans-serif !important;
                    font-weight: normal;
                }
        
                table {
                    border-collapse: collapse;
                    color: #fff !important;
                }
        
                /*  @media only screen and (max-width: 640px) {
                    .deviceWidth {
                        width: 100% !important;
                        padding: 0;
                    }
                    .center {
                        text-align: center!important;
                    }
                }
        
                @media only screen and (max-width: 479px) {
                    .deviceWidth {
                        width: 100% !important;
                        padding: 0;
                    }
                    .center {
                        text-align: center!important;
                    }
                } */
            </style>
        </head>
        
        <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="font-family: 'Varela Round', sans-serif;">
        
            <!-- Wrapper -->
            <table width="580" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                    <td width="580" valign="top" bgcolor="#00121a" style="padding-top:10px">
        
                        <!-- Start Header-->
                        <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
                            <tr>
                                <td width="100%" bgcolor="#00121a">
        
                                    <!-- Logo -->
                                    <table border="0" cellpadding="0" cellspacing="0" align="left" class="deviceWidth">
                                        <tr>
                                            <td style="padding-left:10px" class="center">
                                                <a href="#">
                                                    <img src="https://container.pikanite.com/public/other/logowhite.png" style="height:50px;" alt="" border="0" />
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- End Logo -->
        
                                    <!-- Nav -->
                                    <table border="0" cellpadding="0" cellspacing="0" align="right" class="deviceWidth">
                                        <tr>
                                            <td class="center" valign="middle" style="font-size: 15px; color: #ffffff; font-weight: normal; text-align: right; font-family: 'Varela Round', sans-serif; line-height: 20px; padding:10px 20px; font-style:italic">
                                                Booking ID: ${bookingId}
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- End Nav -->
        
                                </td>
                            </tr>
                        </table>
                        <!-- End Header -->
        
                        <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
                            <tr>
                                <td valign="top" style="color: #fff;text-align:center;" bgcolor="#002533">
                                    <p style="font-size:20px">Hi ${userName}!
                                        <br>
                                        <span style="font-size:16px">Your booking has been confirmed.</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 13px; color: #fff; font-weight: normal; text-align: left;  line-height: 24px; vertical-align: top; padding:5px 8px 5px 8px"
                                    bgcolor="#00121a">
        
                                    <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
                                        <tr>
                                            <td valign="middle" width="50%" style=" text-align:center">
                                                <p>Check-In
                                                    <br> ${checkInDate}
                                                    <br> ${checkInTime}</p>
                                            </td>
                                            <td valign="middle" width="50%" style="text-align:center">
                                                <p>Check-Out
                                                    <br> ${checkOutDate}
                                                    <br> ${checkOutTime}</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
                                        <tr style="border-bottom: 0.5px dotted #7697a2;">
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left">
                                                Hotel Name
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                ${hotelName}
                                            </td>
                                        </tr>
                                        <tr style="border-bottom: 0.5px solid #7697a2;">
                                            <td valign="middle" width="50%" style="padding:0px 10px; text-align:left">
                                                Type of Room
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                ${currentRoomType}/ ${currentRoomSubType}
                                            </td>
                                        </tr>
                                        <tr style="border-bottom: 0.5px double #7697a2; ">
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left; font-weight:normal">
                                                Total You Pay
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right; font-weight:normal">
                                                LKR ${netPrice}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
        
                        </table>
        
                        <table width="580" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth" bgcolor="#00121a" style="margin:0 auto;">
        
                            <tr>
                                <td style="padding:10px 0px">
                                    <table align="left" width="100%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth" bgcolor="#003f56">
        
                                        <tr>
                                            <td valign="top" align="center" class="center" style="padding-top:0px">
                                                <table style="color:#e2e2e2;width:100%">
                                                    <tr style="background-color:#002533;color:#fff; font-weight:normal;text-align:center;">
                                                        <td colspan="2">Hotel Details</td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="30%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Address
                                                        </td>
                                                        <td valign="middle" width="70%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            ${HotelAddress['No']}, ${HotelAddress['Street']}, ${HotelAddress['Address']}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="30%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Contact
                                                        </td>
                                                        <td valign="middle" width="70%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            ${hotelContactNumber}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px solid #7697a2;">
                                                        <td valign="middle" width="30%" style="padding:5px 10px; text-align:left;font-weight:normal; font-size:12px">
                                                            Email
                                                        </td>
                                                        <td valign="middle" width="70%" style="padding:5px 10px;  text-align:right;font-weight:normal; font-size:12px">
                                                            ${hotelEmailForTicket}
                                                        </td>
                                                    </tr>
                                                </table>
        
                                            </td>
                                        </tr>
                                    </table>
        
        
                                </td>
                            </tr>
        
                        </table>
        
                        <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
        
                            <tr>
                                <td style="padding:10px 0px">
                                    <table align="left" width="39.5%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth" bgcolor="#003f56">
        
                                        <tr>
                                            <td valign="top" align="center" class="center" style="padding-top:0px">
                                                <table style="color:#e2e2e2;width:100%">
                                                    <tr style="background-color:#002533;color:#fff; font-weight:normal;text-align:center;">
                                                        <td colspan="2">Price Breakdown</td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="40%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Room Rate
                                                        </td>
                                                        <td valign="middle" width="60%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            LKR ${discountRate}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="40%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Tax
                                                        </td>
                                                        <td valign="middle" width="60%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            LKR ${tax}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px solid #7697a2;">
                                                        <td valign="middle" width="40%" style="padding:5px 10px; text-align:left;font-weight:normal; font-size:12px">
                                                            Total
                                                        </td>
                                                        <td valign="middle" width="60%" style="padding:5px 10px;  text-align:right;font-weight:normal; font-size:12px">
                                                            LKR ${total}
                                                        </td>
                                                    </tr>
                                                </table>
        
                                            </td>
                                        </tr>
                                    </table>
                                    <table align="right" width="59.5%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth" bgcolor="#003f56">
                                        <tr>
                                            <td valign="top" align="center" class="center" style="padding-top:0px">
                                                <table style="color:#fff;width:100%">
                                                    <tr style="background-color:#002533;color:#fff; font-weight:normal;text-align:center;">
                                                        <td colspan="2">Your Details</td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="30%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Name
                                                        </td>
                                                        <td valign="middle" width="70%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            ${userName}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="30%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Email
                                                        </td>
                                                        <td valign="middle" width="70%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            ${userEmail}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px solid #7697a2;">
                                                        <td valign="middle" width="30%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Contact
                                                        </td>
                                                        <td valign="middle" width="70%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            ${userContactNumber}
                                                        </td>
                                                    </tr>
                                                </table>
        
                                            </td>
                                        </tr>
                                    </table>
        
                                </td>
                            </tr>
        
                        </table>
        
                        <table width="400" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#003f56" style="margin:0 auto; display: ${display};">
        
                            <tr>
                                <td style="font-size: 12px; color: #fff; font-weight: normal; text-align: left; font-family: 'Varela Round', sans-serif; line-height: 24px; vertical-align: top; padding:10px 8px 10px 8px"
                                    bgcolor="#00121a">
                                    <table width="80%" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#003f56" style="margin:0 auto;">
                                        <tr style="background-color:#002533;color:#fff; font-weight:normal;text-align:center;font-size:14px">
                                            <td colspan="2">Promotion Details</td>
                                        </tr>
                                        <tr style="border-bottom: 0.5px dotted #7697a2; display: ${display};">
                                            <!--  <tr style="border-bottom: 0.5px dotted #7697a2;" id="promoCode"> -->
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left">
                                                Promo Code
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                ${promoCode}
                                            </td>
                                        </tr>
                                        <!-- <tr style="border-bottom: 0.5px solid #7697a2;">
                                            <td valign="middle" width="50%" style="padding:0px 10px; text-align:left">
                                                Discount Value
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                10%
                                            </td>
                                        </tr> -->
                                        <tr style="border-bottom: 0.5px dotted #7697a2; display: ${display};">
                                            <!-- <tr style="border-bottom: 0.5px dotted #7697a2;" id="promoAmount"> -->
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left">
                                                Promo Amount
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                (LKR ${promoAmount})
                                            </td>
                                        </tr>
        
                                        <tr style="border-bottom: 0.5px double #7697a2; ">
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left; font-weight:normal">
                                                Discounted Total
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right; font-weight:normal">
                                                LKR ${netPrice}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
        
                        <div style="height:5px;margin:0 auto;">&nbsp;</div>
                        <!-- spacer -->
        
                        <!-- 4 Columns -->
                        <table width="580" border="0" cellpadding="0" cellspacing="0" align="center">
                            <tr>
                                <td bgcolor="#002533" style="padding:5px 8px 5px 8px">
                                    <table width="580" border="0" cellpadding="10" cellspacing="0" align="center" class="deviceWidth" style="margin:0 auto;">
                                        <tr>
                                            <td>
        
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" class="deviceWidth">
                                                    <tr>
                                                        <td valign="top" style="font-size: 11px; color: #fff; font-weight: normal; font-family: 'Varela Round', sans-serif; vertical-align: top; text-align:center"
                                                            class="center">
                                                            <p style="padding:0px;"> Having trouble with your Booking?
                                                                <br> Reach out to us on
                                                                <br/>
                                                                <br/>
                                                                <span style="font-size:16px;">
                                                                    <a href="tel:94779777775" style="color:#fff;text-decoration:none;">
                                                                        (+94) 779 777 775
                                                                    </a>
                                                                </span>
                                                                &nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;
                                                                <span style="font-size:16px;">
                                                                    <a href="tel:94779547101" style="color:#fff;text-decoration:none;">
                                                                        (+94) 779 547 101
        
                                                                </span>
                                                                <br/>
                                                                <br/>
                                                                <a href="https://api.whatsapp.com/send?phone=94779777775&text=Hi,%20I%20want%20your%20help.">
                                                                    <i class="fa fa-whatsapp" style="color:#34AF23;font-size:20px"></i>
                                                                </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <a href="https://api.whatsapp.com/send?phone=94779547101&text=Hi,%20I%20want%20your%20help." style="color:#fff;text-decoration:none">
                                                                    <i class="fa fa-whatsapp" style="color:#34AF23;font-size:20px"></i>
                                                                </a>
                                                                </br>
                                                                </br>
                                                                <a href="#" style="text-decoration: none; color: #efefef; font-weight: normal;">info@pikanite.com</a>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
        
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!-- End 4 Columns -->
        
                    </td>
                </tr>
            </table>
            <!-- End Wrapper -->
            <div style="display:none; white-space:nowrap; font:15px courier; color:#002533;">
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            </div>
        </body>
        
        </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('User email sent: ' + info.response);
        }
    });
}