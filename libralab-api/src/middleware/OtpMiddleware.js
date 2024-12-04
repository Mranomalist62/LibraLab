import * as nodemailer from 'nodemailer';
import * as userOTPModel from '../model/userOTPModel.js';
import * as authorOTPModel from '../model/authorOTPmodel.js';
import * as dateFns from 'date-fns';

export async function otpGenerator() {
  let otp_value = Math.floor(Math.random() * 10000);
  return otp_value;
}

export async function sendOTPEmailVerification(emailRecipient) {
  try {
    let otp_value = await otpGenerator();
    let Subject = 'OTP - Libralab';
    let text = 'Jangan bagikan code tersebut pada siapapun: ' + otp_value;
    let from = process.env.EMAILFORSMTP;
    let server = process.env.SERVERFORSMTP;
    let to = emailRecipient;
    let userSMPTP = process.env.USERSMTP;
    let passSMPTP = process.env.PASSSMTP;

    const transport = nodemailer.createTransport({
      host: server,
      port: 465,
      secure: true, // TLS is not used here
      auth: {
        user: userSMPTP,
        pass: passSMPTP,
      },
    });

    // Send the email
    await transport.sendMail({
      from,
      to,
      subject: Subject,
      text: text,
    });

    return {
      otp: otp_value,
      status: 'OTP has been sent',
    };
  } catch (error) {
    console.log(error);
    return { status: 'Error', code: 502, message: error.message };
  }
}

export async function verifyUserOtp(userData) {
  try {
    const ServerOTPData = await userOTPModel.getUserOTPByEmailDb(
      userData.email_user
    );
    if (ServerOTPData !== null) {
      let otpDate = ServerOTPData[0].created_at;
      let expirationDate = dateFns.addMinutes(otpDate, 5);
      let currentDateTime = new Date();

      if (currentDateTime < expirationDate) {
        if (ServerOTPData[0].otp === userData.otp) {
          await userOTPModel.DeleteUserOTPDb(userData);
          return 200;
        } else {
          await userOTPModel.DeleteUserOTPDb(userData);
          console.log('no OTP found for said address');
          return 404;
        }
      } else {
        await userOTPModel.DeleteUserOTPDb(userData);
        console.log('OTP is expired, please redo Initiate signUp');
        return 400;
      }
    } else if (ServerOTPData === 503) {
      console.log('Internal Database Error');
      return 503;
    }
  } catch (error) {
    console.log(error, '\n');
    return 502;
  }
}

export async function verifyAuthorOtp(authorData) {
  try {
    const ServerOTPData = await authorOTPModel.getAuthorOTPByEmailDb(
      authorData.email_author
    );
    if (ServerOTPData !== null) {
      let otpDate = ServerOTPData[0].created_at;
      let expirationDate = dateFns.addMinutes(otpDate, 5);
      let currentDateTime = new Date();

      if (currentDateTime < expirationDate) {
        if (ServerOTPData[0].otp === authorData.otp) {
          await authorOTPModel.DeleteAuthorOTPDb(authorData);
          return 200;
        } else {
          await authorOTPModel.DeleteAuthorOTPDb(authorData);
          console.log('no OTP found for said address');
          return 404;
        }
      } else {
        await authorOTPModel.DeleteUserOTPDb(authorData);
        console.log('OTP is expired, please redo Initiate signUp');
        return 400;
      }
    } else if (ServerOTPData === 503) {
      console.log('Internal Database Error');
      return 503;
    }
  } catch (error) {
    console.log(error, '\n');
    return 502;
  }
}
