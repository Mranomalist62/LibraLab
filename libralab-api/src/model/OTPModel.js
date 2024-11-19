
import DbConnection from '../config/database.js';
import * as userModel from './userModel.js'
//CRUD OTP user

export async function postUserOTPDb(userData){
    let connection =  await DbConnection();

    let queries = 'INSERT INTO userotp(email_user, otp) VALUES (?,?)';
    try{
        const [rows] = await connection.execute(queries,
            [userData.email_user,
            userData.otp]);
        
        if(rows.length !==0){
            return rows;
        } else {
            return null;
        }

    } catch(error){
        console.log(error,'\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function getUserOTPByEmailDb(userEmail){
    let connection =  await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM userOtp WHERE email_user = ?', 
            [userEmail]);
        if (rows.length !== 0){
            return rows;
        } 
        else {
            return null;
        } 
    } catch (error){
        console.log(error,'\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function DeleteUserOTPDb(userData){
    let connection =  await DbConnection();
    let queries = 'DELETE FROM userotp WHERE email_user = ?'
    try{
        const [rows] = await connection.execute(queries,
            [userData.email_user]
        );
        
        if(rows.length !==0){
            return rows;
        } else {
            return null;
        }

    } catch (error){
        console.log(error,'\n');
        return 503;

    } finally {
        connection.end();
        return 
    }
}

