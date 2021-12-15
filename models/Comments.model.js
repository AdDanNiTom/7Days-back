const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentsSchema = new Schema(
    {
		content: {
            type: String,
		    required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {timestamps: true}
	)

const Comment = model('Comment', commentsSchema);

module.exports = Comment;

