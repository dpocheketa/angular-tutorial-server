'use strict';

import express from 'express';
import category from '../../controllers/category';

const router = express.Router();

router.get('/', category.list);

router.get('/:id', category.find);

router.post('/', category.create);

router.put('/:id', category.update);

router.delete('/:id', category.remove);

export default router;
