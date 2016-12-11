'use strict';

import express from 'express';
import user from '../../controllers/user';

const router = express.Router();

router.get('/', user.list);

router.get('/:id', user.find);

router.post('/', user.create);

export default router;
