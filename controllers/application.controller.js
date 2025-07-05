// NOTE: Xử lý logic cho việc ứng tuyển.

const Application = require('../models/application.model');
const Job = require('../models/job.model');
const { sendApplicationEmail } = require('../utils/mailer');
const { appendToSheet } = require('../utils/sheets');

exports.showApplyForm = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).render('pages/404');
        }
        // Truyền thông tin user hiện tại và job vào form
        res.render('pages/apply', { job, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
};

exports.submitApplication = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { full_name, email, phone, message } = req.body;
        const user_id = req.session.user.id;

        // Kiểm tra đã upload file chưa
        if (!req.file) {
            // Cần xử lý lỗi này tốt hơn trên frontend
            return res.status(400).send('Vui lòng upload CV.');
        }

        const cv_url = `/uploads/${req.file.filename}`; // Đường dẫn tới file CV

        // Lưu vào DB
        const applicationData = await Application.create({
            job_id: jobId,
            user_id,
            full_name,
            email,
            phone,
            message,
            cv_url
        });

        // Lấy thông tin job để gửi mail và ghi sheet
        const jobData = await Job.findById(jobId);

        // Gửi mail và ghi vào Google Sheet (chạy bất đồng bộ, không cần đợi)
        sendApplicationEmail(applicationData, jobData);
        appendToSheet(applicationData, jobData);

        // Chuyển hướng người dùng tới trang cảm ơn hoặc trang chi tiết job
        res.send('<h1>Ứng tuyển thành công! Cảm ơn bạn.</h1><a href="/jobs">Quay lại danh sách việc làm</a>');
    } catch (error) {
        console.error(error);
        res.status(500).send('Quá trình ứng tuyển đã có lỗi xảy ra.');
    }
};