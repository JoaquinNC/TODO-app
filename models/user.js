const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);
            this.password = hashedPassword;
        } catch (error) {
            next(error);
        }
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Error al comparar contraseñas');
    }
}

module.exports = mongoose.model('User', userSchema);

