// NOTE: File này cấu hình kết nối database duy nhất và export nó để các model khác sử dụng.

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_URL,
    // ssl: { // Bật dòng này khi deploy lên các dịch vụ như Render/Heroku
    //   rejectUnauthorized: false
    // }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};