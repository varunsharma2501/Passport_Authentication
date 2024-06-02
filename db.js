const mongoose = require("mongoose");

function connectDb() {
    mongoose.connect("mongodb://localhost:27017/passport")
        .then(() => console.log("Connected to MongoDB"))
        .catch(error => console.error("Error connecting to MongoDB:", error));
}

module.exports = { connectDb };
