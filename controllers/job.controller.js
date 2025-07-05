// NOTE: Xử lý logic hiển thị các trang công cộng (trang chủ, danh sách jobs, chi tiết job).

const Job = require('../models/job.model');

exports.showHomePage = (req, res) => {
    // Có thể thêm logic lấy các job nổi bật ở đây
    res.render('pages/index');
};

exports.listJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.render('pages/jobs', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
};

exports.showJobDetail = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).render('pages/404');
        }
        res.render('pages/job-detail', { job });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
};