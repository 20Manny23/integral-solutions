const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    expires: 900, // 15 minutes
    },
})

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;