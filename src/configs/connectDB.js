import pgPromise from 'pg-promise';
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const key = process.env.DB_CONNECT_KEY;
const app = express();
//Create Database connection
const pgp = pgPromise({/* Initialization Options */ });
const db = pgp(key);

// Test connection
(async () => {
    db.connect()
        .then((obj) => {
            console.log('Connected to database');
            obj.done(); // success, release connection;
        })
        .catch((error) => {
            console.error('ERROR:', error.message);
        });
})

export default db;