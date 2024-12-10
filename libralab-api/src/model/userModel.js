import DbConnection from '../config/database.js';

//CRUD function

export async function getUserByIdDb(userId){
    let connection = await DbConnection();

    try {
        const[rows]= await connection.execute('SELECT * FROM user WHERE ID_User = ?', [userId]);
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

export async function getUserByEmailDb(userEmail){
    let connection = await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM user WHERE email_user = ?', [userEmail]);
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


export async function getUserByNameDb(Nama_user){
    let connection = await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM user WHERE Nama_user = ?', [Nama_user]);
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

export async function getUserDb(){
    let connection = await DbConnection();

    try {
    const [rows] = await connection.execute('SELECT * FROM user');
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
    let connection = await DbConnection();
    let queries = 'INSERT INTO user(Nama_user, Ket_alamat, notel_user, norek_user, password_user, email_user) VALUES (?,?,?,?,?,?)';
    try{
        const rows = await connection.execute(queries,
            [userData.Nama_user,
            userData.Ket_alamat,
            userData.notel_user,
            userData.norek_user,
            userData.password_user,
            userData.email_user]);
        
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
    let connection = await DbConnection();
    let queries = 'UPDATE user SET Nama_user = ?, Ket_alamat = ?, notel_user = ?, norek_user = ?, password_user = ?, email_user = ? WHERE ID_User = ?;';
    try{
        const rows = await connection.execute(queries,
            [userData.Nama_user,
            userData.Ket_alamat,
            userData.notel_user,
            userData.norek_user,
            userData.password_user,
            userData.email_user,
            userId]);
        
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
    let connection = await DbConnection();
    let queries = 'DELETE FROM user WHERE ID_User = ?'
    try{
        const rows = await connection.execute(queries,[ID_User]);
        
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
export async function SignUpUserDb(userData){
    let connection = await DbConnection();
    let queries = 'INSERT INTO user(Nama_user, password_user, email_user) VALUES (?,?,?)';
    try{
        const rows = await connection.execute(queries,
            [userData.Nama_user,
            userData.password_user,
            userData.email_user]);
        
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

