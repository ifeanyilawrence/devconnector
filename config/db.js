const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

var connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);

        // exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;