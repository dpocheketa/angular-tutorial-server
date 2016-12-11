'use strict';

import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import mongoose from './libs/mongoose';
import models from './models';
import passport from 'passport';
import session from 'express-session';
import routes from './routes/index';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
const app = express();
let time = +new Date();
start();
function start(){

  const frontendFolder = path.join(__dirname, '../angular-tutorial');
  const frontendDevFolder = path.join(__dirname, '../../angular-tutorial');

  app.set('views', [frontendDevFolder, frontendFolder]);
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.set('trust proxy', 1); // trust first proxy
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(frontendFolder));
  app.use(express.static(frontendDevFolder));

  let allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      next();
  };

  app.use(allowCrossDomain);
  app.use('/', routes);

  const server = app.listen(process.env.PORT || 5000, () => {

    const {address, port} = server.address();

    console.log(`App listening at http://${address}:${port}`);
    console.log(time - new Date());
  });
}

module.exports = app;
