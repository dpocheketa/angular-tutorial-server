'use strict';

import express from 'express';
import product from '../../controllers/product';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', product.list);

router.post('/', auth, product.create);

router.get('/:id', product.find);

router.put('/:id', auth, product.update);

router.delete('/:id', auth, product.remove);

export default router;
