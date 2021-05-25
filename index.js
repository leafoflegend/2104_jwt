const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = require('./api/index');
const client = require('./db/index');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split('Bearer ');

        const validatedToken = jwt.verify(token, SECRET);

        console.log(`Current Requester is a validated user. Username: ${validatedToken.username}`);
    }

    console.log(req.path);

    next();
});

app.use('/api', apiRouter);

const startServer = async () => {
    await client.connect();
    console.log(`DB Connected.`);

    app.listen(PORT, () => {
        console.log(`Server is now listening on PORT:${PORT}`);
    });
}

startServer();
