const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true, },
    content: { type: String, required: true },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const blogModel = mongoose.model('blog', blogSchema);
module.exports = { blogModel }