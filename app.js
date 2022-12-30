const express = require('express');
const app = express();

const bp = require('body-parser');
app.use(bp.json());

// const dotenv = require('dotenv');
// dotenv.config();

// const cors = require('cors');
// app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

// const morgan = require('morgan');
// const fs = require('fs');
// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname,'access.log'),
//     {flags: 'a'});
// app.use(morgan('combined',{stream: accessLogStream}));

const signUpRouter = require('./routes/signup');
app.use('/signup',signUpRouter);

app.listen(3000);
