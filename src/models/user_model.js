/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});


UserSchema.pre('save', async function save(next) {
  const user = this;

  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});


UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};


// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
