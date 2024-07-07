const mongoose = require("mongoose");
const { getEnvironment } = require("./environment");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose
    .connect(getEnvironment().DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 40000,
        family: 4,
    })
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch((error) => console.error("Could not connect to database", error))

module.exports = mongoose;