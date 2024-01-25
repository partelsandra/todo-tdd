const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://root:qwerty12345@cluster0.6odvfgc.mongodb.net/todo",
            {
                useNewUrlParser: true,
            }
        );
    } catch (err) {
        console.error("Error connecting to MongoDB");
    }
}

module.exports = { connect };
