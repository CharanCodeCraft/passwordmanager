const express = require('express')
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')
var cors = require('cors')
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth')
const passmanager = require('./routes/passmanager')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 3000
require('./db.js')

app.use(bodyParser.json())
const allowedOrigins = ['http://localhost:3000','http://localhost:5173']; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);
app.use(cookieParser());

app.use('/auth', auth)
app.use('/passmanager', passmanager)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})