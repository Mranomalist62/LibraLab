import DbConnection from '../config/database.js'


//CRUD Buku
export async function postBookDb(bookData) {
    let connection = await DbConnection();
    let queries = `
        INSERT INTO book(
            judul_buku, 
            ID_Author,
            tahun_terbit,  
            ISBN, 
            bahasa, 
            panjang_buku, 
            berat_buku, 
            harga_buku, 
            format_buku, 
            rating_buku,
            cover_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    try {
        console.log(bookData)
        const rows = await connection.execute(queries, [
            bookData.judul_buku,
            bookData.ID_Author,
            bookData.tahun_terbit,
            bookData.ISBN,
            bookData.bahasa,
            bookData.panjang_buku,
            bookData.berat_buku,
            bookData.harga_buku,
            bookData.format_buku,
            bookData.rating_buku,
            bookData.cover_path 
        ]);

        return rows.length !== 0 ? rows : null;

    } catch (error) {
        console.log(error, '\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function getbookByIdDb(BookId){
    let connection = await DbConnection();

    try {
        const[rows]= await connection.execute(
        'SELECT * FROM book WHERE ID_Buku = ?', [BookId]);
        return rows.length !== 0 ? rows[0] : null;

    } catch (error){
        console.log(error,'\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function getbookByAuthorIdDb(AuthorID){
    let connection = await DbConnection();
    
    try {
        const[rows]= await connection.execute(
        'SELECT * FROM book WHERE ID_Author = ?', [AuthorID]);
        return rows.length !== 0 ? rows : null;

    } catch (error){
        console.log(error,'\n');
        return 503;

    } finally {
        connection.end();
    }
}

export async function putBookDb(bookData) {
    let connection = await DbConnection();
    let queries = `
        UPDATE book
        SET judul_buku = ?, 
            ID_Author = ?,
            tahun_terbit = ?,
            ISBN = ?, 
            bahasa = ?, 
            panjang_buku = ?, 
            berat_buku = ?, 
            harga_buku = ?, 
            format_buku = ?, 
            rating_buku = ?,
            cover_path = ?
        WHERE ID_Buku = ?;
    `;
    try {
        const rows = await connection.execute(queries, [
            bookData.judul_buku,
            bookData.ID_Author,
            bookData.tahun_terbit,
            bookData.ISBN,
            bookData.bahasa,
            bookData.panjang_buku,
            bookData.berat_buku,
            bookData.harga_buku,
            bookData.format_buku,
            bookData.rating_buku,
            bookData.cover_path,
            bookData.ID_Buku
        ]);

        return rows.length !== 0 ? rows : null;
        
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

export async function deleteBookDb(bookId){
    let connection = await DbConnection();
    let queries = 'DELETE FROM book WHERE ID_Buku = ?';
    try {
        const rows = await connection.execute(queries, [bookId]);
        return rows.length !== 0 ? rows : null;
    } catch (error) {
        console.log(error, '\n');
        return 503;
    } finally {
        connection.end();
    }
}

