import DbConnection from '../config/database.js';

//CRUD function

export async function getJobdeskByIdDb(jobdeskId) {
  let connection = await DbConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM jobdesk WHERE ID_Jobdesk = ?',
      [jobdeskId]
    );
    if (rows.length !== 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
  }
}

export async function getJobdeskByNameDb(nama_jobdesk) {
  let connection = await DbConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM jobdesk WHERE nama_jobdesk = ?',
      [nama_jobdesk]
    );
    if (rows.length !== 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
  }
}

export async function getJobdeskAllDb() {
  let connection = await DbConnection();

  try {
    const [rows] = await connection.execute('SELECT * FROM jobdesk');
    if (rows.length !== 0) {
      return rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
  }
}

export async function postJobdeskDb(jobdeskData) {
  let connection = await DbConnection();
  let queries = `INSERT INTO jobdesk(
                    nama_jobdesk) VALUES (?)`;
  try {
    const rows = await connection.execute(queries, [
      jobdeskData.nama_jobdesk,
      jobdeskData.email_jobdesk,
      jobdeskData.password_jobdesk,
      jobdeskData.ID_Jobdesk,
    ]);

    if (rows.length !== 0) {
      return rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
  }
}

export async function putJobdeskDb(jobdeskData, jobdeskId) {
  let connection = await DbConnection();
  let queries = `UPDATE user 
                   SET nama_jobdesk = ?, 
                   WHERE ID_Jobdesk = ?;`;
  try {
    const rows = await connection.execute(queries, [
      jobdeskData.nama_staff,
      jobdeskId,
    ]);

    if (rows.length !== 0) {
      return rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
  }
}

export async function deleteJobdeskDb(ID_Jobdesk) {
  let connection = await DbConnection();
  let queries = 'DELETE FROM staff WHERE ID_Jobdesk = ?';
  try {
    const rows = await connection.execute(queries, [ID_Jobdesk]);

    if (rows.length !== 0) {
      return rows;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
    return;
  }
}
