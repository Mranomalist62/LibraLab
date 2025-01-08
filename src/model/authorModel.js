import DbConnection from '../config/database.js';

// CRUD Functions

export async function getAuthorByIdDb(AuthorId) {
    let connection = await DbConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM author WHERE ID_Author = ?',
            [AuthorId]
        );
        return rows.length !== 0 ? rows[0] : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function getAuthorByEmailDb(authorEmail) {
    let connection = await DbConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM author WHERE email_author = ?',
            [authorEmail]
        );
        return rows.length !== 0 ? rows[0] : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function getAuthorByNameDb(nama_author) {
    let connection = await DbConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM author WHERE nama_author = ?',
            [nama_author]
        );
        return rows.length !== 0 ? rows[0] : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function getAuthorDb() {
    let connection = await DbConnection();
    try {
        const [rows] = await connection.execute(
        'SELECT * FROM author');
        return rows.length !== 0 ? rows : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function postAuthorDb(authorData) {
    let connection = await DbConnection();
    let queries = `
        INSERT INTO author(
            nama_author, Ket_alamat, 
            notel_author, norek_author, 
            password_author, email_author
        ) VALUES (?,?,?,?,?,?,?,?)
    `;
    try {
        const rows = await connection.execute(queries, [
            authorData.Nama_author,
            authorData.Ket_alamat,
            authorData.notel_author,
            authorData.norek_author,
            authorData.password_author,
            authorData.email_author,
        ]);
        return rows.length !== 0 ? rows : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function putAuthorDb(authorData, authorId) {
    let connection = await DbConnection();
    let queries = `
        UPDATE author SET 
            nama_author = ?, Ket_alamat = ?, 
            notel_author = ?, norek_author = ?
        WHERE ID_Author = ?;
    `;
    try {
        const rows = await connection.execute(queries, [
            authorData.Nama_author,
            authorData.Ket_alamat,
            authorData.notel_author,
            authorData.norek_author,
            authorId,
        ]);
        return rows.length !== 0 ? rows : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function deleteAuthorDb(ID_Author) {
    let connection = await DbConnection();
    let queries = 'DELETE FROM author WHERE ID_Author = ?';
    try {
        const rows = await connection.execute(queries, [ID_Author]);
        return rows.length !== 0 ? rows : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

// Sign-Up Function

export async function SignUpAuthorDb(authorData) {
    let connection = await DbConnection();
    let queries = `
        INSERT INTO author(
            nama_author, 
            password_author, 
            email_author
        ) VALUES (?,?,?)
    `;
    try {
        const rows = await connection.execute(queries, [
            authorData.nama_author,
            authorData.password_author,
            authorData.email_author,
        ]);
        return rows.length !== 0 ? rows : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}