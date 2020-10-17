const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    prefix: { type: String, default: "vji!" },
    premium: { type: Boolean, default: false },
    autoRole: { type: Array, default: [] },
    reactionRoles: { type: Array, default: [] }
});

module.exports = mongoose.model("Guild", guildSchema);