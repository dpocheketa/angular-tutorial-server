'use strict';

import express from 'express';
import category from '../../controllers/category';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', category.list);

router.get('/:id', category.find);

router.post('/', auth, category.create);

router.put('/:id', auth, category.update);

router.delete('/:id', auth, category.remove);

export default router;
