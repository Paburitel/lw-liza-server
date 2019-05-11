import mongoose  from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    roles: [
        { type: String }
    ],
    token: {
      type: String
    },
    fistName: String,
    lastName: String,
    created: {
        type: Date,
        default: Date.now
    }
});
// may the force be with you
UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('password')
    .set(function(password) {
        this.salt = crypto.randomBytes(32).toString('base64');
        this.token = crypto.randomBytes(32).toString('hex');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function (){ return this.hashedPassword; });


UserSchema.methods.checkPassword = function (password){
    return this.encryptPassword(password) === this.hashedPassword;
};

UserSchema.path('fistName').validate(function(fistName) {
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{2,}/;
    return passwordRegex.test(fistName);
}, 'The fistName field should be correct.');

UserSchema.path('lastName').validate(function(lastName) {
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{2,}/;
    return passwordRegex.test(lastName);
}, 'The lastName field should be correct.');

UserSchema.path('email').validate(function(email) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'The email field should be correct.');

UserSchema.virtual('userId')
    .get(function () {
        return this.id;
    });

const User = mongoose.model('User', UserSchema);

export { UserSchema, User };
