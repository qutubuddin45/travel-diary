import express from 'express';
import {signUp} from '../controller/auth.controller.js';
import {signIn} from '../controller/auth.controller.js';
const router = express.Router();

router.post("/signUp",signUp);
router.post("/signIn",signIn)

export default router;      










