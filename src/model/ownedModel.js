import DbConnection from '../config/database.js';

export async function getOwnedBookByIdDb(ownedBookId) {
    let connection = await DbConnection();
    let queries = `
        SELECT 
            * 
        FROM owned_book
        WHERE ID_Owned = ?;
    `;
    try {
        const [rows] = await connection.execute(queries, [ownedBookId]);

        return rows.length !== 0 ? rows[0] : null; // Return the first row if found, otherwise null

    } catch (error) {
        console.log(error, '\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function getOwnedBooksByUserIdDb(userId) {
    let connection = await DbConnection();
    let queries = `
        SELECT 
            * 
        FROM owned_book
        WHERE ID_User = ?;
    `;
    try {
        const [rows] = await connection.execute(queries, [userId]);

        return rows.length !== 0 ? rows : null; // Return all owned books if found, otherwise null

    } catch (error) {
        console.log(error, '\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function postOwnedBookDb(ownedBookData) {
    let connection = await DbConnection();
    let queries = `
        INSERT INTO owned_book(
            ID_User, 
            ID_Buku
        ) VALUES (?, ?);
    `;
    try {
        const [rows] = await connection.execute(queries, [
            ownedBookData.ID_User,
            ownedBookData.ID_Buku
        ]);

        return rows.affectedRows !== 0 ? rows : null;

    } catch (error) {
        console.log(error, '\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function putOwnedBookDb(ownedBookData) {
    let connection = await DbConnection();
    let queries = `
        UPDATE owned_book
        SET 
            ID_User = ?, 
            ID_Buku = ?
        WHERE ID_Owned = ?;
    `;
    try {
        const [rows] = await connection.execute(queries, [
            ownedBookData.ID_User,
            ownedBookData.ID_Buku,
            ownedBookData.ID_Owned
        ]);

        return rows.affectedRows !== 0 ? rows : null;

    } catch (error) {
        console.log(error, '\n');
        return 503;

    } finally {
        connection.end();
    }
}