const pgp = require('pg-promise')

/**
 * DB credentials
 */
const dbName = 'paypay';
const dbUser = 'postgres';
const dbPassword = 'root';
const dbHostURL = 'localhost';
const dbHostPort = '5432';

const dbPath = `postgres://${dbUser}:${dbPassword}@${dbHostURL}:${dbHostPort}/${dbName}`

const initOptions = {
    // pg-promise initialization options...
    query(e) {
        console.log('QUERY:', e.query);
    }
};

/**
 * Connecting to PostgreSQL Database
 */
const db = pgp(initOptions)(dbPath)

module.exports = db