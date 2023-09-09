const { Schema, model } = require('mongoose');

const userSchema = new Schema(

  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //validate: {
        // validator?? match a valid email
      //},
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }

);

userSchema
  .virtual('friendCount')
  .get(function () {
    // may be wrong
    return this.friends.length;

  })
 
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
