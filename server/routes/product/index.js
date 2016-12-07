'use strict';

import express from 'express';
import product from '../../product';

const router = express.Router();

router.get('/', product.list);

router.get('/:id', product.find);

router.post('/', product.create);

export default router;


// function(req, res){
//   let new_product = req.body;
//   let { categoryId, name, fat, protein, carb, kcal } = new_product;

//   if (name && fat && protein && carb && kcal && categoryId) {
//     let item = _product.create(new_product);
//     res.status(201).json(item);
//   } else {
//     let errors = {};
//     _.each(['categoryId', 'name', 'fat', 'protein', 'carb', 'kcal'], function(prop){
//       if (_.isEmpty(new_product[prop])) {
//         errors[prop] = prop + ' is required field';
//       }
//     });
//     res.status(400).send({
//       message: 'Bad Request',
//       errors
//     });
//   }
// }
