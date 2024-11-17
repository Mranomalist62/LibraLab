import * as nodemailer from 'nodemailer';

export async function EmailOTPVerification(emailRecipient){

    let otp_value = Math.floor(Math.random()*10000);
    let Subject = 'OTP - Libralab';
    let text = 'Jangan bagikan code tersebut pada siapapun: ' + otp_value;
    let from = process.env.EMAILFORSMTP;
    let to = emailRecipient;

    const transport = nodemailer.createTransport({
        host: 'mxslurp.click',
        port: '2525',
        secure: false,
        auth : {
            user: 'Q2yV1wCM4vvomwanljMiprKIg8bLREBR',
            pass: 'MvX7rFLY6Xyt8YHvgYcvAqOfNSsOfI2t'
        }
    })

    transport.sendMail({
        Subject, text, from , to

    }).then(()=>{
        let result = {
            otp : otp_value,
            status : 'success'
        }
        return result ;
    }).catch(error => {
        console.log(error);
        return 502;
    })

} 
