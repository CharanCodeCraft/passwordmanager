const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const passwordSchema = new mongoose.Schema({
    id: { type: String, required: true }, // UUID
    site: String,
    username: String,
    password: String,
  }, { _id: false });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwords: [passwordSchema]
});
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()
})
const User = mongoose.model('User', userSchema);

module.exports = User;