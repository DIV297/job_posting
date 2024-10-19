const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

const authenticateToken = async (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret"); 
        const company = await Company.findById(decoded.user._id).select("name phoneNumber companyEmail companyName empSize ");
        
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        req.user = company;
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, message: 'Invalid token',error:error.message });
    }
};

module.exports = authenticateToken;
