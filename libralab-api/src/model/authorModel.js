import DbConnection from '../config/database.js';

//CRUD function

export async function getAuthorByIdDb(AuthorId){
    let connection = await DbConnection();

    try {
        const[rows]= await connection.execute('SELECT * FROM author WHERE ID_Author = ?', [AuthorId]);
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

export async function getAuthorByEmailDb(authorEmail){
    let connection = await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM author WHERE email_author = ?', [authorEmail]);
        if (rows.length !== 0){
            return rows[0];
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


export async function getAuthorByNameDb(nama_author){
    let connection = await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM author WHERE nama_author = ?', [nama_author]);
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

export async function getAuthorDb(){
    let connection = await DbConnection();

    try {
    const [rows] = await connection.execute('SELECT * FROM author');
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

export async function postAuthorDb(authorData){
    let connection = await DbConnection();
    let queries = 'INSERT INTO author(nama_author, ID_Provinsi, ID_Kabupaten, Ket_alamat, notel_author, norek_author, password_author, email_author) VALUES (?,?,?,?,?,?,?,?)';
    try{
        const rows = await connection.execute(queries,
            [authorData.Nama_author,
            authorData.ID_Provinsi,
            authorData.ID_Kabupaten,
            authorData.Ket_alamat,
            authorData.notel_author,
            authorData.norek_author,
            authorData.password_author,
            authorData.email_author]);
        
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

export async function putAuthorDb(authorData, authorId){
    let connection = await DbConnection();
    let queries = 'UPDATE author SET nama_author = ?, ID_Provinsi = ?, ID_Kabupaten = ?, Ket_alamat = ?, notel_author = ?, norek_author = ?, password_author = ?, email_author = ? WHERE ID_Author = ?;';
    try{
        const rows = await connection.execute(queries,
            [authorData.Nama_author,
            authorData.ID_Provinsi,
            authorData.ID_Kabupaten,
            authorData.Ket_alamat,
            authorData.notel_author,
            authorData.norek_author,
            authorData.password_author,
            authorData.email_author,
            authorId]);
        
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

export async function deleteAuthorDb(ID_Author){
    let connection = await DbConnection();
    let queries = 'DELETE FROM author WHERE ID_Author = ?'
    try{
        const rows = await connection.execute(queries,[ID_Author]);
        
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



//Sign Up function
export async function SignUpAuthorDb(authorData){
    let connection = await DbConnection();
    let queries = 'INSERT INTO author(nama_author, password_author, email_author) VALUES (?,?,?)';
    try{
        const rows = await connection.execute(queries,
            [authorData.nama_author,
            authorData.password_author,
            authorData.email_author]);
        
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

