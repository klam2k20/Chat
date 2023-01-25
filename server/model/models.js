const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
    },
  },
  { timestamp: true },
);

/**
 * Hashes the users' passwords before saving to the
 * database. Use a function instead of arrow function for
 * the callback function. An arrow function changes
 * this scope
 */
userSchema.pre('save', async function save(next) {
  // Only hash the pw if it has been changed or new
  if (!this.isModified('password')) {
    return next();
  }

  /**
   * Create a salt to add to input before hashing
   * Salts add random characters before and after
   * the input to add randomization and before collisions
   * in hashing. The larger the salt the better.
   */
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

/**
 * Validates user password when login in. Need to await on it
 */
userSchema.methods.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

const messageSchema = new Schema(
  {
    sender: { type: String, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  },
  {
    timestamp: true,
  },
);

const chatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    groupChat: { type: Boolean, default: false },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: String,
      ref: 'Message',
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamp: true },
);

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = { User, Message, Chat };
