// NOTE: File này chứa các hàm để thao tác với bảng 'users'.

const db = require('./db');

const User = {
    create: async ({ full_name, email, password_hash, role = 'user' }) => {
        const query = `
            INSERT INTO users (full_name, email, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, full_name, email, role, created_at;
        `;
        const { rows } = await db.query(query, [full_name, email, password_hash, role]);
        return rows[0];
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = $1;';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    },

    findById: async (id) => {
        const query = 'SELECT id, full_name, email, role FROM users WHERE id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = User;