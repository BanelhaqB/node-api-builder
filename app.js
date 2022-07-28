const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

// const globalErrorHandler = require('./errorController');
const initController = require('./controllers/initController');
const intiRoutes = require('./routes/intiRoutes');

const app = express();

// 1-GLOBAL MIDDLEWARE *****************************************************
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet()); //Security HTTP headers --- Has to be the first middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests froom this IP, please try again in an hour!',
});
app.use('/api', limiter);

//Reading data from body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 3- ROUTES *****************************************************

app.use('/api/v1', intiRoutes);

// app.use(globalErrorHandler);

module.exports = app;
