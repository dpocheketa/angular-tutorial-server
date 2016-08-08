'use strict';

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
const User = mongoose.model('User');
const router = express.Router();

passport.use(new LocalStrategy.Strategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
  res.status(200).json({username: req.user.username});
});

router.get('/secure', (req, res) => {
  if (req.user) {
    res.status(200).json({secure: true});
  } else {
    res.status(401).json({message: 'Not Authorized'})
  }
  console.log(req.user);
});

export default router;
