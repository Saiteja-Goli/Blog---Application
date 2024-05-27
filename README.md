## Blog Application


## Introduction
This application will allow users to Register, Login, Create, Edit, Delete, and Read blog posts. The project will be divided into backend and frontend components, and you will integrate them to create a seamless user experience.

## Project Type
Frontend | Backend | Fullstack

## Deplolyed App
- Deployed Link : [Click Here](https://blog-application-3z49.vercel.app/)
- Backend : [Click Here](https://blog-application-slj2.onrender.com/)

## Directory Structure
Blog---Application/
├─ client/
├─ server/

## Features
##### User Authentication
- User Registration: Users can create a new account by providing a username, email, and password.
- User Login: Users can log in using their registered email and password.
- User Logout: Users can Logout on their own.

##### Blog Management
- Create Blog: Authenticated users can create new blog posts.
- View All Blogs: Authenticated Users can view a list of all blogs with pagination.
- View My Blogs: Authenticated users can view a list of blogs they have created.
- Edit Blog Details: Authenticated users can edit their specific blog posts.
- Delete Blog: Authenticated users can delete their specific blog posts.


##### Blog Features
- Pagination: Blogs are displayed with pagination to improve readability and performance.
- Date Formatting: Blog post creation dates are displayed in a user-friendly format.
- Author Information: Blog posts display the author's username.
- No Blogs Message: A user-friendly message is displayed when no blogs are available.
- Navigation

##### Navigation
- Navbar: A persistent navigation bar with links to important sections of the application.
- Conditional Rendering: The login/logout button changes color and label based on the user's authentication status.
- Button for Creating Blog: Users can navigate to the blog creation page using a dedicated button.
- My Blogs Button: Users can quickly navigate to their own blogs using a dedicated button.


##### Backend
- MongoDB: The application uses MongoDB for data storage.
- Mongoose: Mongoose is used for object data modeling (ODM).
- Express.js: The backend server is built using Express.js.
- JWT Authentication: JSON Web Tokens (JWT) are used for securing API routes.
- bcrypt: bcrypt is used for hashing and securely storing user passwords.
- RESTful API: The application follows RESTful principles for API design.


## Getting Started
Follow these instructions to set up and run the Movie App locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   https://github.com/Saiteja-Goli/Blog---Application.git
   ```

2. Navigate to the project folder:

   ```bash
   cd client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the development server:

```bash
npm run dev
```

## Credentials
email: sai1@gmail.com
password: sai123

## Technologies Used

This project leverages the following technologies:

- **MongoDB**: A NoSQL database that stores data in a flexible, JSON-like format. It is used as the backend database to manage and store information about movies.

- **Express.js**: A server-side web application framework for Node.js that simplifies the creation of robust APIs. The Express.js framework is utilized to handle HTTP requests, define routes, and interact with the MongoDB database.

- **React**: A JavaScript library for building user interfaces, developed by Facebook. It allows for the creation of reusable UI components. The front-end of this project is built using React, providing a dynamic and interactive user experience.

- **Node.js**: A JavaScript runtime that allows developers to run JavaScript code on the server side. In this project, Node.js is used as the server-side runtime environment to execute server-side logic, handle requests, and serve the React application.

These technologies, collectively known as the MERN stack, enable a full-stack JavaScript development environment, providing flexibility, scalability, and efficiency in building modern web applications.

# Technology Stack
List and provide a brief overview of the technologies used in the project.

- Node.js
- Express.js
- MongoDB
- React.js
- Other libraries/modules
