import express from 'express';
import {getUser} from '../controller/user.controller.js';
import {VerifyToken} from '../utils/verifyUser.js';
const router = express.Router();

router.get("/getUser", VerifyToken, getUser);

export default router;  