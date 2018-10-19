var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pg = require('pg');
var bodyParser = require('body-parser');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;
var app = express();

const {notFound, errorHandler} = require('./routes/Middleware');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(notFound);
app.use(errorHandler);

module.exports = app;
