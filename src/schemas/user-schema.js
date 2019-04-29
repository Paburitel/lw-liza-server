import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fistName: String,
    lastName: String,
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.path('email').validate(function (email) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'The email field should be correct.');

UserSchema.path('password').validate(function (password) {
    const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}/;
    return passwordRegex.test(password);
}, 'The email field should be correct.');

UserSchema.virtual('userId')
    .get(function () {
        return this.id;
    });

const UserModel = mongoose.model('User', UserSchema);

export { UserSchema, UserModel };
