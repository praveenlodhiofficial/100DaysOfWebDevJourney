require('dotenv').config();

const config = {
  serverPort: process.env.PORT || 5000,  
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/Local-Course-Selling-Application',  
  adminJwtSecret: process.env.JWT_ADMIN_SECRET,  
  userJwtSecret: process.env.JWT_USER_SECRET,  
  authTokenExpiry: process.env.AUTH_TOKEN || '1d',  
};

module.exports = config;
