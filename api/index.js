const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getUser, createUser } = require('../db/users');

const apiRouter = Router();

const SECRET = process.env.SECRET;

apiRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const userCreated = await createUser({
        username,
        password,
    });

    if (!userCreated) {
        res.status(400).send({
            message: `Username ${username} is already taken.`,
        });
    } else {
        res.send({
            message: `User created successfully.`,
        });
    }
});

apiRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await getUser({
        username,
        password,
    });

    if (user) {
        const userToken = jwt.sign({
            username,
            id: user.id,
        }, SECRET);

        res.send({
            token: userToken,
        });
    } else {
        res.status(401).send({
            message: 'Username/Password invalid or not found.',
        });
    }
});

module.exports = apiRouter;
