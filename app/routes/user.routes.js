import { Router } from "express";
import {createUser, userLogin, findUserById, findAllUsers,updateUserById,deleteUserById} from '../controllers/user.controller.js';
import {checkDuplicateEmail} from '../middleware/verifySingUp.js';
import {verifyToken} from '../middleware/auth.js';
const userRouter = Router();

userRouter.post('/api/signup',createUser, checkDuplicateEmail);
userRouter.post('/api/signin',userLogin);
userRouter.get('/api/user/:id',verifyToken, findUserById);
userRouter.get('/api/user/',verifyToken, findAllUsers);
userRouter.put('/api/user/:id',verifyToken, updateUserById);
userRouter.delete('/api/user/:id',verifyToken, deleteUserById);

export default userRouter;