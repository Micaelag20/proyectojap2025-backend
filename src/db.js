const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'ecommerce',
  connectionLimit: 5
});

module.exports = {
  async query(sql, params) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (error) {
      console.error('Error en la base de datos:', error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
};  