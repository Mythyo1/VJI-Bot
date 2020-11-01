const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    prefix: { type: String, default: "m!" },
    premium: { type: Boolean, default: false },
    blacklist: { type: Boolean, default: false },
    warns: { type: Array, default: [] },
    autoRole: { type: Array, default: [] },
    reactionRoles: { type: Array, default: [] }
});

module.exports = mongoose.model("Guild", guildSchema);