var nodemailer = require('nodemailer');

/* Email bcc */
/* For live port */
// var emailBcc = 'discover@pikanite.com, praveen@pikanite.com, emaillogger@pikanite.com';

/* For dev port */
var emailBcc = 'test@pikanite.com'

exports.ticket = function (
    emailSendTo,
    bookingId,
    hotelName,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    currentRoomSubType,
    currentRoomType,
    guestCountInRoom,
    total,
    userName,
    userEmail,
    userContactNumber,
    discountRate,
    tax,
    promoCode,
    promoAmount,
    netPrice,
    pikaniteFee,
    hotelFee

) {
    console.log("Sending hotel ticket")
    var display = '';

    if (promoAmount == 0) {
        display = 'none'
    }
    else {
        display = 'bloc'
    }

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

    var hotelMailOptions = {
        from: '"Pikanite : Book With Us" <discover@pikanite.com>',
        to: `${emailSendTo}`,
        bcc: emailBcc,
        subject: 'Pikanite : New Guest Booking',
        text: 'Booking confirmation as follows',
        html: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        
        <head>
        
        
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
            <title>Hotel Ticket</title>
        
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
                    <td width="100%" valign="top" bgcolor="#00121a" style="padding-top:10px">
        
                        <!-- Start Header-->
                        <table width="100%" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
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
                                            <td class="center" style="font-size: 13px; color: #ffffff; font-weight: light; text-align: right; font-family: 'Varela Round', sans-serif; line-height: 20px; vertical-align: middle; padding:10px 20px; font-style:italic">
                                                Booking ID: ${bookingId}
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- End Nav -->
        
                                </td>
                            </tr>
                        </table>
                        <!-- End Header -->
        
                        <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
                            <tr>
                                <td valign="top" style="color: #fffbfb;text-align:center;" bgcolor="#002533">
                                    <p style="font-size:24px">Hi ${hotelName}!
                                        <br>
                                        <span style="font-size:16px">You have a new guest.</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 13px; color: #fff; font-weight: normal; text-align: left; font-family: 'Varela Round', sans-serif; line-height: 24px; vertical-align: top; padding:5px 8px 5px 8px"
                                    bgcolor="#00121a">
        
                                    <table width="580" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
                                        <tr>
                                            <td valign="middle" width="50%" style="padding:0 10px 5px 0; text-align:center">
                                                <p>Date of Arrival
                                                    <br> ${checkInDate}
                                                    <br> ${checkInTime}</p>
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0 10px 5px 0; text-align:center">
                                                <p>Date of Departure
                                                    <br> ${checkOutDate}
                                                    <br> ${checkOutTime}</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#00121a" style="margin:0 auto;">
                                        <tr style="border-bottom: 0.5px solid #7697a2;">
                                            <td valign="middle" width="50%" style="padding:0px 10px; text-align:left">
                                                Room Name
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                ${currentRoomSubType}
                                            </td>
                                        </tr>
                                        <tr style="border-bottom: 0.5px solid #7697a2;">
                                            <td valign="middle" width="50%" style="padding:0px 10px; text-align:left">
                                                Type of Room
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right">
                                                ${currentRoomType}
                                            </td>
                                        </tr>
        
                                        <tr style="border-bottom: 0.5px double #7697a2; ">
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left; font-weight:normal">
                                                Number of Guests
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right; font-weight:normal">
                                                ${guestCountInRoom}
                                            </td>
                                        </tr>
                                        <tr style="border-bottom: 0.5px double #7697a2; ">
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:left; font-weight:normal">
                                                Total Booking Value
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right; font-weight:normal">
                                                LKR ${total}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!-- End One Column -->
        
        
                        <!-- <div style="height:5px;margin:0 auto;">&nbsp;</div> -->
                        <!-- spacer -->
        
        
                        <!-- 2 Column Images & Text Side by SIde -->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth" bgcolor="#00121a" style="margin:0 auto;">
                            <!--<tr>
                                        <td bgcolor="#00aef0">
                                            <div style="height:6px">&nbsp;</div>
                                        </td>
                                    </tr>-->
                            <tr>
                                <td style="padding:10px 0">
                                    <table align="left" width="60%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth" bgcolor="#003f56">
                                        <tr>
                                            <td valign="top" align="center" class="center" style="padding-top:0px">
                                                <table style="color: #e2e2e2;width:100%">
                                                    <tr style="background-color:#002533;color:#fff; font-weight:normal;text-align:center;font-size:14px">
                                                        <td colspan="2">Guest Details</td>
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
                                    <table align="right" width="39.5%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth" bgcolor="#003f56">
                                        <tr>
                                            <td valign="top" align="center" class="center" style="padding-top:0px">
                                                <table style="color: #e2e2e2;width:100%">
                                                    <tr style="background-color:#002533;color:#fff; font-weight:normal;text-align:center;font-size:14px">
                                                        <td colspan="2">Regular Price Breakdown</td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted  #7697a2;">
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
        
        
                                </td>
                            </tr>
        
                        </table>
        
                        <!-- End 2 Column Images & Text Side by SIde -->
                        <!--    <div style="height:10px;margin:0 auto;">&nbsp;</div> -->
                        <!-- spacer -->
        
                        <table width="100%" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#003f56" style="margin:0 auto; display: ${display};">
        
                            <tr>
                                <td style="font-size: 12px; color: #e2e2e2; font-weight: normal; text-align: left; font-family: 'Varela Round', sans-serif; line-height: 24px; vertical-align: top; padding:10px 8px 10px 8px"
                                    bgcolor="#00121a">
                                    <table width="60%" class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#003f56" style="margin:0 auto;">
                                        <tr style="background-color:#002533;color:#ffffff; font-weight:normal;text-align:center;font-size:14px">
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
                                                Discounted Total(Guest Pay)
                                            </td>
                                            <td valign="middle" width="50%" style="padding:0px 10px;  text-align:right; font-weight:normal">
                                                LKR ${netPrice}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
        
                        <!--  <div style="height:10px;margin:0 auto;">&nbsp;</div> -->
                        <!-- spacer -->
        
        
                        <!-- Two Column (Images Stacked over Text) -->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="deviceWidth" bgcolor="#00121a" style="margin:0 auto;">
        
                            <tr>
                                <td class="center" style="padding:10px 0 10px 0px">
        
                                    <table align="center" width="60%" cellpadding="0" cellspacing="0" border="0" class="deviceWidth" bgcolor="#003f56">
                                        <tr>
                                            <td valign="top" align="center" class="center" style="padding-top:0px">
                                                <table style="color:#fff;width:100%">
                                                    <tr style="background-color:#002533;color:#ffffff; font-weight:normal;text-align:center;">
                                                        <td colspan="2">Commission Details</td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="50%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Total for Commission
                                                        </td>
                                                        <td valign="middle" width="50%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            LKR ${discountRate}
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px dotted #7697a2;">
                                                        <td valign="middle" width="50%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Pikanite Commission (10%)
                                                        </td>
                                                        <td valign="middle" width="50%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            (LKR ${pikaniteFee})
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom: 0.5px doubled #7697a2;">
                                                        <td valign="middle" width="50%" style="padding:5px 10px; text-align:left; font-size:12px">
                                                            Total Hotel Earnings
                                                        </td>
                                                        <td valign="middle" width="50%" style="padding:5px 10px;  text-align:right; font-size:12px">
                                                            LKR ${hotelFee}
                                                        </td>
                                                    </tr>
        
                                                </table>
        
                                            </td>
                                        </tr>
                                    </table>
        
        
        
                                </td>
                            </tr>
        
                        </table>
                        <!-- End Two Column (Images Stacked over Text) -->
        
        
                        <!--  <div style="height:10px;margin:0 auto;">&nbsp;</div> -->
                        <!-- spacer -->
        
                        <!-- 4 Columns -->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                            <tr>
                                <td bgcolor="#002533" style="padding:5px 8px">
                                    <table width="580" border="0" cellpadding="10" cellspacing="0" align="center" class="deviceWidth" style="margin:0 auto;">
                                        <tr>
                                            <td>
        
                                                <table width="40%" cellpadding="0" cellspacing="0" border="0" align="center" class="deviceWidth">
                                                    <tr>
                                                        <td valign="top" style="font-size: 11px; color: #f1f1f1; font-weight: normal; font-family: 'Varela Round', sans-serif;vertical-align: top; text-align:center"
                                                            class="center">
        
        
        
                                                            <a href="#" style="text-decoration: none; color: #efefef; font-weight: normal;">partner@pikanite.com</a>
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
        
        </html>
        
        `
    };

    transporter.sendMail(hotelMailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Hotel email sent: ' + info.response);
        }
    });
}