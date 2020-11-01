const mongoose = require("mongoose");

const purgeSchema = new mongoose.Schema({
    _id: String,
    messages: Array,
    mod: String
});

module.exports = mongoose.model("purges", purgeSchema);