import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSDB,
    database: process.env.DATABASENAME,
};

export default async function DatabaseConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Database connected successfully!');
        return connection;
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}