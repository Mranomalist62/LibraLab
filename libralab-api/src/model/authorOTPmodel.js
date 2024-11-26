
import DbConnection from '../config/database.js';
import * as authorModel from './authorModel.js'
//CRUD OTP author

export async function postAuthorOTPDb(authorData){
    let connection =  await DbConnection();

    let queries = `INSERT INTO 
                    authorotp
                    (email_author,otp) 
                    VALUES (?,?)`;
    try{
        const [rows] = await connection.execute(queries,
            [authorData.email_author,
            authorData.otp]);
        
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

export async function getAuthorOTPByEmailDb(authorEmail){
    let connection =  await DbConnection();

    try {
        const [rows] = await connection.execute(
            'SELECT * FROM authorotp WHERE email_author = ?', 
            [authorEmail]);
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

export async function DeleteAuthorOTPDb(authorData){
    let connection =  await DbConnection();
    let queries = 'DELETE FROM authorotp WHERE email_author = ?'
    try{
        const [rows] = await connection.execute(queries,
            [authorData.email_author]
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

