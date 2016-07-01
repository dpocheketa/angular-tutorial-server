'use strict';

import express from 'express';
import db from '../db/db.json';
const router = express.Router();

router.use('/', (req, res, next) => {
  if (req.path === '/') {
    res.render('index.html');
  } else {
    next();
  }
});

router.use('/db', (req, res) => {
  res.json(db);
});

export default router;
