const mongoose = require('mongoose')
const profileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    vouches: { type: Number, required: true, default: 1 },
    discriminator: { type: String },
    username: { type: String }
}
);
const model = mongoose.model('ProfileModel', profileSchema)
module.exports = model;