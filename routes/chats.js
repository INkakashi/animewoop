const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId,
        ref: "user"},
    
    date:{
        type: Date,
        default: Date.now
    },

    chat: String
})
module.exports = mongoose.model('chat',chatSchema)