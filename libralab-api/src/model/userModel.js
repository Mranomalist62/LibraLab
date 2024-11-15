import Connection from '../config/database.js';

export async function getUserByIdDb(userId){
    let connection = Connection.DatabaseConnection();

    try {
        const rows = await connection.execute('SELECT * FROM user WHERE ID_User = ?', [userId]);
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

export async function getUserByNameDb(Nama_user){
    let connection = Connection.DatabaseConnection();

    try {
        const rows = await connection.execute('SELECT * FROM user WHERE Nama_User = ?', [Nama_user]);
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

export async function getUserDb(){
    let connection = Connection.DatabaseConnection();

    try {
    const rows = await connection.execute('SELECT * FROM user');
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

export async function postUserDb(userData){
    let connection = Connection.DatabaseConnection();
    let queries = 'INSERT INTO user(Nama_user, ID_Provinsi, ID_Kabupaten, Ket_alamat, notel_user, norek_user, password_user, email_user) VALUES (?,?,?,?,?,?,?,?)';
    try{
        const rows = await connection.execute(queries,
            userData.Nama_user,
            userData.ID_Provinsi,
            userData.ID_Kabupaten,
            userData.Ket_alamat,
            userData.notel_user,
            userData.norek_user,
            userData.password_user,
            userData.email_user);
        
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

export async function putUserDb(userData, userId){
    let connection = Connection.DatabaseConnection();
    let queries = 'UPDATE User SET Nama_user = ?, ID_Provinsi = ?, ID_Kabupaten = ?, Ket_alamat = ?, notel_user = ?, norek_user = ?, password_user = ?, email_user = ? WHERE ID_User = ?;';
    try{
        const rows = await connection.execute(queries,
            userData.Nama_user,
            userData.ID_Provinsi,
            userData.ID_Kabupaten,
            userData.Ket_alamat,
            userData.notel_user,
            userData.norek_user,
            userData.password_user,
            userData.email_user,
            userId);
        
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

export async function deleteUserDb(ID_User){
    let connection = Connection.DatabaseConnection();
    let queries = 'DELETE FROM user WHERE ID_User = ?'
    try{
        const rows = await connection.execute(queries,ID_User);
        
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


