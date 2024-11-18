
import Connection from '../config/database.js';
import * as userModel from './userModel.js'
//CRUD OTP user

export async function postUserOTPDb(userData){
    let connection = Connection.DatabaseConnection();

    let queries = 'INSERT INTO userotp(email_user, otp) VALUES (?,?)';
    try{
        const rows = await connection.execute(queries,
            userData.email_user,
            userData.otp);
        
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

export async function DeleteUserOTPDb(userData){
    let connection = Connection.DatabaseConnection();
    let queries = 'DELETE FROM userotp WHERE email_user = ?'
    try{
        const rows = await connection.execute(queries,
            userData.email_user
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

