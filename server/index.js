'use strict';

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ejs from 'ejs';

// import passport from 'passport';
// import LocalStrategy from 'passport-local';

import routes from './routes/index';
// import users        from './routes/users'
console.log(__dirname);

const app = express();
const frontendFolder = path.join(__dirname, '../angular-tutorial');
const frontendDevFolder = path.join(__dirname, '../../angular-tutorial');

app.set('views', [frontendDevFolder, frontendFolder]);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(frontendFolder));
app.use(express.static(frontendDevFolder));

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', routes);

// var User = function(){
//   this.findOne = function(obj, cb){
//     return cb(null, {id: 1});
//   };
// };

// passport.use(new LocalStrategy.Strategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// app.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/' }));










const server = app.listen(process.env.PORT || 5000, () => {

  const {address, port} = server.address();

  console.log(`Example app listening at http://${address}:${port}`);
});

// app.use('/', routes);
// app.use('/users', users);

// // using arrow syntax
// app.use((req, res, next) => {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// if (app.get('env') === 'development') {
//   app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
