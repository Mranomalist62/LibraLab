import * as nodemailer from 'nodemailer'
import * as OTPModel from '../model/OTPModel.js'
import * as dateFns from 'date-fns'

export async function otpGenerator(){
    let otp_value = Math.floor(Math.random()*10000);
    return otp_value;
}

export async function sendOTPEmailVerification(emailRecipient){

    let otp_value = otpGenerator();
    let Subject = 'OTP - Libralab';
    let text = 'Jangan bagikan code tersebut pada siapapun: ' + otp_value;
    let from = process.env.EMAILFORSMTP;
    let to = emailRecipient;
    let userSMPTP = process.env.USERSMPTP
    let passSMPTP = process.env.PASSSMPTP

    const transport = nodemailer.createTransport({
        host: 'mxslurp.click',
        port: '2525',
        secure: false,
        auth : {
            user: userSMPTP,
            pass: passSMPTP
        }
    })

    transport.sendMail({
        Subject, text, from , to

    }).then(()=>{
        let result = {
            otp : otp_value,
            status : 'OTP has been sent'
        }
        return result ;
    }).catch(error => {
        console.log(error);
        return 502
    })

} 

export async function verifyOtp(userData){
    try {
        ServerOTPData = await OTPModel.getUserOTPByEmailDb(userData.email_user);
        
        if(ServerOTPData !== null){
            let otpDate = await dateFns.parse(ServerOTPData.created_at, 'yyyy-MM-dd HH:mm:ss', new Date());
            let expirationDate = dateFns.addMinutes(otpDate, 5)
            let currentDateTime = new Date();

            if(currentDateTime < expirationDate){
                if(ServerOTPData.otp === userData.otp){
                    await OTPModel.DeleteUserOTPDb(userData);
                    return 200
                } else {
                    await OTPModel.DeleteUserOTPDb(userData);
                    console.log('no OTP found for said address');
                    return 404
                }
            } else {
                console.log('OTP is expired, please redo Initiate signUp')
                return 400
            }
        } else if(ServerOTPData === 503){
            console.log('Internal Database Error');
            return 503
        }

    } catch (error) {
        console.log(error,'\n');
        return 502;
    }
}
