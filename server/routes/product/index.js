'use strict';

import express from 'express';
import _ from 'lodash';
import product from '../../product';

const router = express.Router();

router.get('/', function(req, res, next){
  if (_.isEqual(req.path, '/')) {
    let list = product.getAll();
    res.json(list);
  } else {
    next();
  }
});

router.get('/:id', function(req, res){
  let item = product.getById(req.params.id);

  if (item){
    res.json(item);
  } else {
    res.status(404).send("404 Not Found\n");
  }

});

router.post('/', function(req, res){
  let newProduct = req.body;
  let { categoryId, name, fat, protein, carb, kcal } = newProduct;

  if (name && fat && protein && carb && kcal && categoryId) {
    let item = product.create(newProduct);
    res.status(201).json(item);
  } else {
    let errors = {};
    _.each(['categoryId', 'name', 'fat', 'protein', 'carb', 'kcal'], function(prop){
      if (_.isEmpty(newProduct[prop])) {
        errors[prop] = prop + ' is required field';
      }
    });
    res.status(400).send({
      message: 'Bad Request',
      errors
    });
  }
});

export default router;
