'use strict';

import express from 'express';
import _ from 'lodash';
import category from '../../category';

const router = express.Router();

router.get('/', function(req, res, next){
  if (_.isEqual(req.path, '/')) {
    let list = category.getAll();
    res.json(list);
  } else {
    next();
  }
});

router.get('/:id', function(req, res){
  let item = category.getById(req.params.id);

  if (item){
    res.json(item);
  } else {
    res.status(404).send("404 Not Found\n");
  }

});

router.post('/', function(req, res){
  let name = req.body.name;

  if (name) {
    let item = category.create({name});
    res.status(201).json(item);
  } else {
    res.status(400).send({
      message: 'Bad Request',
      errors:{
        name: 'name is required'
      }
    });
  }
});

export default router;
