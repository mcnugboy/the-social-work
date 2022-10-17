const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.connect (
    process.env.MONGODB_URI || "",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;