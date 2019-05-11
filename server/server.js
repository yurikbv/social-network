const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();
const app = express();

//db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_LOCAL, { useNewUrlParser: true }).then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
});

//Bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "Unauthorized"});
  }
});



const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`)
});