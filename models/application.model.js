// NOTE: File này chứa các hàm để thao tác với bảng 'applications'.

const db = require('./db');

const Application = {
    create: async ({ job_id, user_id, full_name, email, phone, message, cv_url }) => {
        const query = `
            INSERT INTO applications (job_id, user_id, full_name, email, phone, message, cv_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [job_id, user_id, full_name, email, phone, message, cv_url]);
        return rows[0];
    },

    findAll: async () => {
        // Nối bảng để lấy tên job
        const query = `
            SELECT a.*, j.title as job_title
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            ORDER BY a.created_at DESC;
        `;
        const { rows } = await db.query(query);
        return rows;
    },
    
    findByJobId: async (jobId) => {
        const query = `
            SELECT a.*, j.title as job_title
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            WHERE a.job_id = $1
            ORDER BY a.created_at DESC;
        `;
        const { rows } = await db.query(query, [jobId]);
        return rows;
    }
};

module.exports = Application;