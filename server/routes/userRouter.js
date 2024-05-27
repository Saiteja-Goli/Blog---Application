const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Router } = require('express');
const { userModel } = require('../models/userModel');

const userController = Router();

// Route for user signup
userController.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email already exists
        const emailExists = await userModel.findOne({ email });

        if (emailExists) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create a new user
        const user = new userModel({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: "SignUp Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Signup Failure" });
    }
});

// Route for user login
userController.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email Not Found" });
        }

        // Compare the provided password with the stored hashed password
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (correctPassword) {
            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: "1h",
            });
            return res.status(200).json({ message: "Login Successful", token });
        } else {
            return res.status(401).json({ message: "Wrong Credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = { userController };
