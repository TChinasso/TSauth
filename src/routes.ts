import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware'

import AuthController from './app/controllers/AuthController';
import UserControler from './app/controllers/UserController';

const router = Router();

router.post('/users', UserControler.store)
router.post('/auth', AuthController.authenticate)
router.get('/users', authMiddleware, UserControler.list)

export default router