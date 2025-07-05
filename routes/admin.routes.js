// NOTE: Định tuyến cho trang admin, được bảo vệ bởi middleware.
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');

// Áp dụng middleware cho tất cả các route trong file này
router.use(isAuthenticated, isAdmin);

// Dashboard
router.get('/dashboard', adminController.showDashboard);

// Job management
router.get('/jobs', adminController.listJobs);
router.get('/jobs/new', adminController.showJobForm); // Form tạo mới
router.post('/jobs', adminController.createJob);
router.get('/jobs/edit/:id', adminController.showJobForm); // Form sửa
router.post('/jobs/edit/:id', adminController.updateJob); // Dùng POST cho form submit đơn giản
router.post('/jobs/delete/:id', adminController.deleteJob);

// Application management
router.get('/applications', adminController.listApplications);

module.exports = router;