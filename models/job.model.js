// NOTE: File này chứa các hàm để thao tác với bảng 'jobs'.

const db = require('./db');

const Job = {
    findAll: async () => {
        const query = 'SELECT * FROM jobs ORDER BY created_at DESC;';
        const { rows } = await db.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM jobs WHERE id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    create: async ({ title, description, requirements, benefits, location, deadline, created_by }) => {
        const query = `
            INSERT INTO jobs (title, description, requirements, benefits, location, deadline, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [title, description, requirements, benefits, location, deadline, created_by]);
        return rows[0];
    },

    update: async (id, { title, description, requirements, benefits, location, deadline }) => {
        const query = `
            UPDATE jobs
            SET title = $1, description = $2, requirements = $3, benefits = $4, location = $5, deadline = $6
            WHERE id = $7
            RETURNING *;
        `;
        const { rows } = await db.query(query, [title, description, requirements, benefits, location, deadline, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM jobs WHERE id = $1 RETURNING id;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = Job;