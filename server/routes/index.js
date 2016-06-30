'use strict';

import express from 'express';
import db from '../db/db.json';
const router = express.Router();

router.use('/', (req, res) => {
  res.render('index.html');
});

router.use('/db', (req, res) => {
  console.log(db);
  res.json(db);
});

export default router;
