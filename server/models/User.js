const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    injuries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Injury'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// hooks
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare password for login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// virtuals
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
