const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    premium: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    blacklist: { type: Boolean, default: false },
    votes: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);