

const express = require('express');
const { authorizeCompany, addJob } = require('../controllers/company');
const authenticateToken = require('../middleware/authorize');
const router = express.Router();

router.get('/',authenticateToken, authorizeCompany);
router.post('/',authenticateToken, addJob);


module.exports = router;
