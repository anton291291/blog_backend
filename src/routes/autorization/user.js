import express from 'express';
import passport from 'passport';
import UserController from '../../controllers/UserController';

const User = new UserController();

const router = express.Router();

router.post('/register', User.register)

router.post('/login', User.login);

router.get('/me',passport.authenticate('jwt', { session: false }), User.auth);


export default router;
