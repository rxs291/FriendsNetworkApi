const { Schema, model } = require('mongoose');
var moment = require('moment');
const reactionSchema = require('./Reaction'); 

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            ////change "type: Date" to "type: String" to allow for moment formatting
            type: String,
            default: moment().format("MMMM Do, YYYY [at] h:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false

    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
