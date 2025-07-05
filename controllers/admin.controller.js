// NOTE: Xử lý toàn bộ logic cho trang Admin.

const Job = require('../models/job.model');
const Application = require('../models/application.model');

exports.showDashboard = (req, res) => {
    // Logic thống kê sẽ được thêm vào đây
    res.render('admin/dashboard');
};

// --- Job Management ---
exports.listJobs = async (req, res) => {
    const jobs = await Job.findAll();
    res.render('admin/jobs', { jobs });
};

exports.showJobForm = async (req, res) => {
    // Nếu có req.params.id là đang sửa, không thì là tạo mới
    if (req.params.id) {
        const job = await Job.findById(req.params.id);
        res.render('admin/job-form', { job, action: 'Sửa' });
    } else {
        res.render('admin/job-form', { job: null, action: 'Tạo mới' });
    }
};

exports.createJob = async (req, res) => {
    await Job.create({ ...req.body, created_by: req.session.user.id });
    res.redirect('/admin/jobs');
};

exports.updateJob = async (req, res) => {
    await Job.update(req.params.id, req.body);
    res.redirect('/admin/jobs');
};

exports.deleteJob = async (req, res) => {
    await Job.delete(req.params.id);
    res.redirect('/admin/jobs');
};

// --- Application Management ---
exports.listApplications = async (req, res) => {
    const { jobId } = req.query; // Lọc theo query param ?jobId=...
    let applications;
    if (jobId) {
        applications = await Application.findByJobId(jobId);
    } else {
        applications = await Application.findAll();
    }
    const jobs = await Job.findAll(); // Lấy danh sách jobs để tạo bộ lọc
    res.render('admin/applications', { applications, jobs, selectedJob: jobId });
};