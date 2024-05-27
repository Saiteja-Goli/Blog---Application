require("dotenv").config();
const { Router } = require('express');
const mongoose = require('mongoose');
const { blogModel } = require("../models/blogModel");
const { authentication } = require('../middleware/authentication');

const blogController = Router();

// Get all blogs (public route, no authentication required)
// blogController.get('/allBlogs', async (req, res) => {
//     try {
//         const blogPosts = await blogModel.find().populate('authorId', 'name');
//         res.json(blogPosts);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// Define a route handler for GET requests to '/allBlogs'
blogController.get('/allBlogs', async (req, res) => {
    try {
        // Parse the 'page' and 'limit' query parameters, or default to 1 and 10 if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // Calculate the number of documents to skip based on the current page
        const skip = (page - 1) * limit;

        // Fetch the blog posts from the database
        // - Skip the first 'skip' documents
        // - Limit the result to 'limit' documents
        // - Populate the 'authorId' field with the 'username' of the user who created the blog post
        const blogPosts = await blogModel.find()
            .skip(skip)
            .limit(limit)
            .populate('authorId', 'username');

        // Count the total number of blog posts in the database
        const totalBlogs = await blogModel.countDocuments();

        res.json({
            blogs: blogPosts,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all blogs by the authenticated user
blogController.get('/myBlogs', authentication, async (req, res) => {
    const userId = req.userId; // Get userId from req object

    try {
        const userBlogs = await blogModel.find({ authorId: userId }).populate('authorId', 'username');
        res.json(userBlogs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Post a new blog
blogController.post('/postBlog', authentication, async (req, res) => {
    try {
        const { title, content } = req.body;
        const authorId = req.userId; // Get authorId from the authenticated user

        // Validate authorId
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({ message: 'Invalid authorId format' });
        }

        const blogPost = new blogModel({ title, content, authorId });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit a blog post
blogController.put('/editBlog/:id', authentication, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = req.userId; // Get authorId from the authenticated user

    try {
        // Validate blog ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid blog ID format' });
        }

        const blog = await blogModel.findOne({ _id: id, authorId });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found or you do not have permission to edit this blog' });
        }

        blog.title = title;
        blog.content = content;
        blog.updatedAt = Date.now();

        await blog.save();

        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog post
blogController.delete('/deleteBlog/:id', authentication, async (req, res) => {
    const { id } = req.params;
    const authorId = req.userId; // Get authorId from the authenticated user

    try {
        // Validate blog ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid blog ID format' });
        }

        const blog = await blogModel.findOne({ _id: id, authorId });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found or you do not have permission to delete this blog' });
        }

        await blogModel.deleteOne({ _id: id });

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//Likes
module.exports = { blogController };
