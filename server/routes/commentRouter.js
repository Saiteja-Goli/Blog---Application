require("dotenv").config();
const { Router } = require('express');
const mongoose = require('mongoose');
const { authentication } = require("../middleware/authentication");
const { commentModel } = require("../models/commentModel");


const commentController = Router();
// Create a comment
commentController.post('/postcomment', authentication, async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const newComment = new commentModel({
            postId,
            userId: req.userId,
            comment
        });
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", newComment });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
});

commentController.get('/get/:postId', authentication, async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await commentModel.find({ postId }).populate('userId');
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Could not fetch comments' });
    }
});


commentController.delete('/delete/:commentId', authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.userId; // Get the user ID from the authenticated request

        // Find the comment by ID and check if the requesting user is the owner of the comment
        const deletedComment = await commentModel.findOneAndDelete({ _id: commentId, userId: userId });

        if (!deletedComment) {
            // If the comment was not found or the user is not the owner, return a 404 status
            return res.status(404).json({ error: 'Comment not found or unauthorized to delete' });
        }

        // If the comment was deleted successfully, return a success message
        res.json({ "deletedComment": deletedComment, msg: "Deleted comment Successfully" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Could not delete comment' });
    }
});

module.exports = commentController;
