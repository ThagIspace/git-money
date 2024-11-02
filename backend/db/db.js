const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('DB Connection Error:', err));
};

module.exports = { db };
