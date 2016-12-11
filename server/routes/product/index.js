'use strict';

import express from 'express';
import product from '../../controllers/product';

const router = express.Router();

router.get('/', product.list);

router.post('/', product.create);

router.get('/:id', product.find);

router.put('/:id', product.update);

router.delete('/:id', product.remove);

export default router;
