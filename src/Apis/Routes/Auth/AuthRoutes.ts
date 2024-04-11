import express from 'express';
import * as authController from '../../Controller/Auth/AuthController';

const router = express.Router();

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/reset-password', authController.resetPassword);
router.post('/forgot-password', authController.forgotPassword);

export default router;
