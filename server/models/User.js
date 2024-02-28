const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'You must enter a username'],
      minLength: [2, 'Your username must be at least 2 characters in length']
    },
    email: {
      type: String,
      required: [true, 'You must enter a password'],
      unique: true,
      validate: {
        validator(val) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
        },
        message: 'Your email address is not formatted correctly'
      }
    },

    password: {
      type: String,
      required: [true, 'You must enter a password'],
      minLength: [6, 'Your password must be at least 6 characters in length']
    },

    notes: [{
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }]
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }

  next();
});

userSchema.methods.validatePass = async function (formPassword) {
  console.log('form', formPassword)
  console.log('encrypted', this.password)

  const is_valid = await compare(formPassword, this.password);

  return is_valid;
}

const User = model('User', userSchema);

module.exports = User;