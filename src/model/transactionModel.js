    import DbConnection from '../config/database.js';

    export async function getTransactionByIdDb(transactionId) {
        let connection = await DbConnection();
        let queries = `
            SELECT 
                * 
            FROM transaction
            WHERE ID_Transaksi = ?;
        `;
        try {
            const [rows] = await connection.execute(queries, [transactionId]);

            return rows.length !== 0 ? rows[0] : null; // Return the first row if found, otherwise null

        } catch (error) {
            console.log(error, '\n');
            return 503;

        } finally {
            connection.end();
        }
    }

    export async function getTransactionByAuthorIdDb(transactionId) {
        let connection = await DbConnection();
        let queries = `
            SELECT 
                * 
            FROM transaction
            WHERE ID_Author = ?;
        `;
        try {
            const [rows] = await connection.execute(queries, [transactionId]);

            return rows.length !== 0 ? rows : null; // Return the first row if found, otherwise null

        } catch (error) {
            console.log(error, '\n');
            return 503;

        } finally {
            connection.end();
        }
    }

    export async function getTransactionUnconfirmedByAuthorIdDb(transactionId) {
    let connection = await DbConnection();
    let queries = `
        SELECT 
            * 
        FROM transaction
        WHERE ID_Author = ? AND status_transaksi = 'unverified';
    `;
    try {
        const [rows] = await connection.execute(queries, [transactionId]);

        return rows.length !== 0 ? rows : null; // Return the rows if found, otherwise null

    } catch (error) {
        console.log(error, '\n');
        return 503;

    } finally {
        connection.end();
    }
}


    export async function getTransactionsByUserIdDb(userId) {
        let connection = await DbConnection();
        let queries = `
            SELECT 
                *
            FROM transaction
            WHERE ID_User = ?;
        `;
        try {
            const [rows] = await connection.execute(queries, [userId]);

            return rows.length !== 0 ? rows : null; // Return all transactions if found, otherwise null

        } catch (error) {
            console.log(error, '\n');
            return 503;

        } finally {
            connection.end();
        }
    }

    export async function postTransactionDb(transactionData) {
        let connection = await DbConnection();
        let queries = `
            INSERT INTO transaction(
                rating_transaksi,
                status_transaksi, 
                ID_Buku, 
                ID_User,
                ID_Author,
                file_path
            ) VALUES (?, 'unverified', ?, ?, ?, ?);
        `;
        try {
            const [rows] = await connection.execute(queries, [
                transactionData.rating_transaksi || 0,
                transactionData.ID_Buku,
                transactionData.ID_User,
                transactionData.ID_Author,
                transactionData.file_path  // Added file_path in execution
            ]);

            return rows.affectedRows !== 0 ? rows : null;

        } catch (error) {
            console.log(error, '\n');
            return 503;

        } finally {
            connection.end();
        }
    }

    export async function putTransactionDb(transactionData) {
        let connection = await DbConnection();
        let queries = `
            UPDATE transaction
            SET 
                rating_transaksi = ?, 
                status_transaksi = ?, 
                ID_Buku = ?, 
                ID_User = ?, 
                ID_Author = ?,
                file_path = ?  
            WHERE ID_Transaksi = ?;
        `;
        try {
            const [rows] = await connection.execute(queries, [
                transactionData.rating_transaksi,
                transactionData.status_transaksi,
                transactionData.ID_Buku,
                transactionData.ID_User,
                transactionData.ID_Author,
                transactionData.file_path,  
                transactionData.ID_Transaksi 
            ]);

            return rows.affectedRows !== 0 ? rows : null;

        } catch (error) {
            console.log(error, '\n');
            return 503;

        } finally {
            connection.end();
        }
    }

    export async function confirmTransactionDb(transactionData) {
        let connection = await DbConnection();
        let queries = `
            UPDATE transaction
            SET 
                status_transaksi = 'verified'  
            WHERE ID_Transaksi = ?;
        `;
        try {
            const [rows] = await connection.execute(queries, [transactionData]);
    
            return rows.affectedRows !== 0 ? rows : null; 
    
        } catch (error) {
            console.log(error, '\n');
            return 503; 
    
        } finally {
            connection.end();
        }
    }

    export async function unconfirmTransactionDb(transactionData) {
        let connection = await DbConnection();
        let queries = `
            UPDATE transaction
            SET 
                status_transaksi = 'Unverified'  
            WHERE ID_Transaksi = ?;
        `;
        try {
            const [rows] = await connection.execute(queries, [transactionData]);
    
            return rows.affectedRows !== 0 ? rows : null; 
    
        } catch (error) {
            console.log(error, '\n');
            return 503; 
    
        } finally {
            connection.end();
        }
    }