const client = require('./index');

const createUser = async ({ username, password }) => {
    try {
        // TODO: We should hash the password.
        await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
        `, [username, password]);

        return true;
    } catch (e) {
        console.log('Failed to create user.', username);
        console.error(e);

        return false;
    }
};

const getUser = async ({ username, password }) => {
    try {
        const { rows } = await client.query(`
            SELECT id 
            FROM users
            WHERE username = $1 AND password = $2
            LIMIT 1
        `, [username, password]);

        return rows[0] || null;
    } catch (e) {
        console.log('Failed to get user.', username);
        console.error(e);
    }
};

module.exports = {
    createUser,
    getUser,
};
