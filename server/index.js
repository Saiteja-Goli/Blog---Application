const express = require('express')
const cors = require("cors");

const { connection } = require("./config/db");
const { userController } = require('./routes/userRouter');
const { blogController } = require('./routes/blogRouter');
const app = express();

const corsOptions = {
    origin: 'https://blog-application-tan-sigma.vercel.app',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}
app.use(cors(corsOptions))
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ Message: "Welcome to Home Page" });
});

app.use('/user', userController)
app.use('/blogs', blogController)



app.listen(process.env.PORT || 8000, async () => {
    try {
        await connection
        console.log('connected to db');
        console.log(`server is running at ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})