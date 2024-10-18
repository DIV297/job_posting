const express = require('express');
const { registerCompany, verifyEmailOTP, verifyMobileOTP, verifyBoth } = require('../controllers/register');
const router = express.Router();

router.post('/registerCompany', registerCompany);
router.post('/verifyEmailOTP', verifyEmailOTP);
router.post('/verifyMobileOTP', verifyMobileOTP);
router.post('/verifyBoth', verifyBoth);

module.exports = router;
