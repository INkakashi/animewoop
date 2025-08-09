const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/animewoop')
const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

userSchema.plugin(plm);

module.exports = mongoose.model('user',userSchema)