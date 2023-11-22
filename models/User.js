const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
      },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        default: 'user'
    },
    terms:{
        type: String,
        default: 'yes'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema);