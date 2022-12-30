const express = require('express');
const app = express();

const bp = require('body-parser');
app.use(bp.json());

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors({
    origin:"http://52.66.153.80",
    methods: ['GET','POST']
}));

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

const loginRouter = require('./routes/login');
app.use('/login',loginRouter);

const homeRouter = require('./routes/home');
app.use('/home',homeRouter);

const User = require('./models/user');


const sequelize = require('./util/database');

sequelize
.sync()
.then(()=> app.listen(3000))
.catch(err => console.log(err));

