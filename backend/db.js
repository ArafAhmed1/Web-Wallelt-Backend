const mongoose = require('mongoose');
const {Schema} = require('mongoose');
mongoose.connect(process.env.MONGO_URI);


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 5,
        maxLength: 30,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30,
    
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
})

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    balance: {
        type: Number,
        required: true,
    }
})




const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account,
}