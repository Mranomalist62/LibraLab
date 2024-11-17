import mysql from 'mysql2';


const dbConfig = {
    host : process.env.HOSTDB,
    user : process.env.USERDB,
    password : process.env.PASSDB,
    database : process.env.DATABASENAME
};

export default async function DatabaseConnection(){
    try{ 
        const connection = await mysql.createConnection(dbConfig);
        return connection;

    } catch (error){
        console.log('connection error: ', error);
    }
}