const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

const usersRouter = require('./Routes/usersRouter.js')

const postsRouter = require('./Routes/postsRouter.js')

const likesRouter = require('./Routes/likesRouter.js')

app.use('/users', usersRouter)

app.use('/posts', postsRouter)

app.use('/likes', likesRouter)

app.use('/', (req, res) => {
    res.send('Welcome to Facebook')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})