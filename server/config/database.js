// database.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-database-user',
  host: 'your-database-host',
  database: 'your-database-name',
  password: 'your-database-password',
  port: 'your-database-port',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
