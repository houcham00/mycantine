const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to AREA database !');
    } catch (error) {
        console.error('Connection Failed!', error);
    }
};

module.exports = connectDB;
