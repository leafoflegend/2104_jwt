const client = require('./index');
const { hash, compare } = require('./hash');

const createUser = async ({ username, password }) => {
    const hashedPassword = hash(password);

    try {
        // TODO: We should hash the password.
        await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
        `, [username, hashedPassword]);

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
            SELECT id, password
            FROM users
            WHERE username = $1
            LIMIT 1
        `, [username]);

        const user = rows[0];

        if (!user) return null;

        const passwordMatch = compare(password, user.password);

        if (passwordMatch) return { id: user.id };

        return null;
    } catch (e) {
        console.log('Failed to get user.', username);
        console.error(e);
    }
};

module.exports = {
    createUser,
    getUser,
};
