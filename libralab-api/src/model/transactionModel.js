import DbConnection from '../config/database.js';

export async function postBookDb(transactionData) {
  let connection = await DbConnection();
  let queries = `
        INSERT INTO transaction(
            rating_transaksi,
            format_buku,  
            status_transaksi, 
            ID_Gudang, 
            ID_Buku, 
            ID_Staff, 
            ID_User
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);
    `;
  try {
    const rows = await connection.execute(queries, [
      transactionData.rating_transaksi,
      transactionData.format_buku,
      transactionData.status_transaksi,
      transactionData.ID_Gudang,
      transactionData.ID_Buku,
      transactionData.ID_Staff,
      transactionData.ID_User,
    ]);

    return rows.length !== 0 ? rows : null;
  } catch (error) {
    console.log(error, '\n');
    return 503;
  } finally {
    connection.end();
  }
}
