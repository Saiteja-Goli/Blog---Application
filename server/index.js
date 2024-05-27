const express = require('express')
const cors = require("cors");

const { connection } = require("./config/db");
const { userController } = require('./routes/userRouter');
const { blogController } = require('./routes/blogRouter');
const commentController = require('./routes/commentRouter');
const app = express();


app.use(cors())
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ Message: "Welcome to Home Page" });
});

app.use('/user', userController)
app.use('/comments', commentController)
app.use('/blogs', blogController)

app.listen(process.env.PORT || 8000, async () => {
    try {
        await connection
        console.log('connected to db...');
        console.log(`server is running at ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})