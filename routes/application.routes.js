// NOTE: Định tuyến cho chức năng ứng tuyển.
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const applicationController = require('../controllers/application.controller');
const isAuthenticated = require('../middleware/auth.middleware');

// Cấu hình Multer để lưu file CV
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Tạo tên file duy nhất: userid-jobid-timestamp.pdf
    const uniqueSuffix = `${req.session.user.id}-${req.params.jobId}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

// Routes
// Phải đăng nhập mới được vào trang apply
router.get('/:jobId', isAuthenticated, applicationController.showApplyForm); 
// Phải đăng nhập và có file upload
router.post('/:jobId', isAuthenticated, upload.single('cv'), applicationController.submitApplication);

module.exports = router;