const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
  pnr: {
        type: String,
        required: true
    },
})

const admin = mongoose.model("Data", adminSchema);

module.exports = admin