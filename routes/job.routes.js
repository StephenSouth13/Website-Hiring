// NOTE: Định tuyến cho các trang công cộng.
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.get('/', jobController.showHomePage);
router.get('/jobs', jobController.listJobs);
router.get('/jobs/:id', jobController.showJobDetail);

module.exports = router;