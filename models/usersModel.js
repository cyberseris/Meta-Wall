const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, '請輸入您的名字']
    },
    email: {
        type: String,
        required: [true, '請輸入您的 Email'],
        unique: true,
        lowercase: true,
        select: false
    },
    photo: String,
}, {
    versionKey: false
});

const User = mongoose.model('user', userSchema);

module.exports = User;