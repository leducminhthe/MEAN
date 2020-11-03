const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv/config');
app.listen(3000);

const postRoute = require('./routes/posts');
const userRouter = require('./routes/user');

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route middleware
app.use('/api/posts', postRoute);
app.use('/api/user', userRouter);

<<<<<<< HEAD
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (!err) {
            console.log('success connect');
        } else {
            console.log('false');
        }
    });

const confilg = 'conflig';
=======
mongoose.connect(process.env.DB_CONNECT, 
                {useNewUrlParser: true, useUnifiedTopology: true}, 
                function(err){
                    if (!err) {
                        console.log('success connect');
                    } else {
                        console.log('false');
                }
});

const test = '';
>>>>>>> 0be8fe6be39d160eed7d2f2e6290183e28409561