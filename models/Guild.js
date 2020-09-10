const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    prefix: { type: String, default: "vji!" },
    premium: { type: Boolean, default: false }
});

module.exports = mongoose.model("Guild", guildSchema);