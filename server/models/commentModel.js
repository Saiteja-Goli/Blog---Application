const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = { commentModel };
