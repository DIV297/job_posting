

const express = require('express');
const { authorizeCompany, addJob, login, getJobsByCompanyId } = require('../controllers/company');
const authenticateToken = require('../middleware/authorize');
const router = express.Router();

router.post('/login', login);
router.get('/',authenticateToken, authorizeCompany);
router.post('/',authenticateToken, addJob);
router.get('/jobs',authenticateToken, getJobsByCompanyId);


module.exports = router;
