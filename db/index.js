const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://localhost:5432/2102-jwt',
});

module.exports = client;
