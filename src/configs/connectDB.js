import pgPromise from 'pg-promise';
import express from 'express';

const key = process.env.DB_CONNECT_KEY;
const app = express();
//Create Database connection
const pgp = pgPromise({/* Initialization Options */ });
const db = pgp('postgres://postgres:1@localhost:5432/Block');

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

    // db.query(`select * from users`, (err, res)=>{
    //     if(!err) {
    //         console.log(res.rows);
    //     } else {
    //         console.log(err.message);
    //     }
    //     db.end;
    // })

export default db;