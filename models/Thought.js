const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

const thoughtSchema = new Schema(

    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            //getter method
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    // may be wrong
    return this.reactions.length;

  })

  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;