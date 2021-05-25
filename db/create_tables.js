const client = require('./index');

const createTables = async (dropTables = false) => {
    try {
        if (dropTables) {
            await client.query(`
                DROP TABLE IF EXISTS users;
            `);

            console.log('Successfully dropped previous tables.');
        }

        await client.query(`
            CREATE TABLE users
            (
                id       SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255)        NOT NULL
            );
        `);

        console.log('Successfully created tables.');
    } catch (e) {
        console.error(e);
    }
};

module.exports = createTables;

if (require.main === module) {
    const scriptFunc = async () => {
        try {
            await client.connect();
            await createTables(true);
            await client.end();
        } catch (e) {
            console.log('"scriptFunc" failed to run.');
            console.error(e);
        }
    }

    scriptFunc();
}
