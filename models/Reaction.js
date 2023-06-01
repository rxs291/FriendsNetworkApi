const { Schema, Types } = require('mongoose');
var moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            default: 'Unnamed reaction',
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            ////change "type: Date" to "type: String" to allow for moment formatting
            type: String,
            default: moment().format("MMMM Do, YYYY [at] h:mm a"),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
 

module.exports = reactionSchema;