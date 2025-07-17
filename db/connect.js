const mongoose = require('mongoose')

// Connect to the MongoDB database
// This function uses the MONGO_URI from the .env file
const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB