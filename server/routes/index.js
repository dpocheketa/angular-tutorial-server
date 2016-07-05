'use strict';

import express from 'express';
import _ from 'lodash';
import db from '../db/db.json';
import category from './category';
import product from './product';
const router = express.Router();

router.use('/', (req, res, next) => {
  if (_.isEqual(req.path,'/')) {
    res.render('index.html');
  } else {
    next();
  }
});


//@TODO remove later
router.use('/api/db', (req, res) => {
  res.json(db);
});

router.use('/api/category', category);

router.use('/api/product', product);

export default router;
