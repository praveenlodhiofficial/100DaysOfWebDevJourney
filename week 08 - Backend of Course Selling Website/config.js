require('dotenv').config()

// ------------------------------------------------------------>

const config = ({
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    USER_JWT_SECRET: process.env.USER_JWT_SECRET,
    ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
})

// ------------------------------------------------------------>

module.exports = config