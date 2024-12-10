import DbConnection from '../config/database.js';

//CRUD function

export async function getStaffByIdDb(staffId){
    let connection = await DbConnection();

    try {
        const[rows]= await connection.execute('SELECT * FROM staff WHERE ID_Staff = ?', [staffId]);
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

export async function getStaffByEmailDb(staffEmail){
    let connection = await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM staff WHERE email_staff = ?', [staffEmail]);
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


export async function getStaffByNameDb(nama_staff){
    let connection = await DbConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM staff WHERE nama_staff = ?', [nama_staff]);
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

export async function getStaffDb(){
    let connection = await DbConnection();

    try {
    const [rows] = await connection.execute('SELECT * FROM staff');
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

export async function postStaffDb(staffData){
    let connection = await DbConnection();
    let queries = `INSERT INTO staff(
                    nama_staff,
                    email_staff,
                    password_staff,
                    ID_Jobdesk) VALUES (?,?,?,?)`;
    try{
        const rows = await connection.execute(queries,
            [staffData.nama_staff,
            staffData.email_staff,
            staffData.password_staff,
            staffData.ID_Jobdesk]);
        
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

export async function putStaffDb(staffData, staffId){
    let connection = await DbConnection();
    let queries = `UPDATE user 
                   SET nama_staff = ?, 
                   email_staff = ?, 
                   password_staff = ? 
                   WHERE ID_Staff = ?;`;
    try{
        const rows = await connection.execute(queries,
            [staffData.nama_staff,
            staffData.email_staff,
            staffData.password_staff,
            staffId]);
        
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

export async function deleteStaffDb(ID_Staff){
    let connection = await DbConnection();
    let queries = 'DELETE FROM staff WHERE ID_Staff = ?'
    try{
        const rows = await connection.execute(queries,[ID_Staff]);
        
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


