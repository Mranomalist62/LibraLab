import mysql from 'mysql2';


const dbConfig = {
    host : 'localhost',
    user : 'root',
    password : 'kukukakikukaku',
    database : 'db_libralab'
};

export default async function DatabaseConnection(){
    try{ 
        const connection = mysql.createConnection(dbConfig);
        return connection;

    } catch (error){
        console.log('connection error: ', error);
    }
}