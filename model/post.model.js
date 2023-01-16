const mongoose = require("mongoose");

const postShema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: {
        type: String,
        enum: {
            values: ["PC", "TABLET", "MOBILE"],
            message: `value is not supported pleae provide"PC","TABLET","MOBILE `
        }
    },
    userID: { type: String }
})

module.exports = mongoose.model("Post", postShema);
