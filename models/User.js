const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    premium: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);