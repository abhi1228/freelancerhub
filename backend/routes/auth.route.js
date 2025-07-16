import express from 'express'
import { login, register,logout } from '../controllers/auth.controller.js';


const router=express.Router();

console.log('auth router');

router.post('/register',register);
router.post('/login',login);
router.delete('/logout',logout);

export default router;