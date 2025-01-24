import { Router } from "express";
import {createBootcamp, addUser,findBootcampById,findAllBootcamp} from '../controllers/bootcamp.controller.js';
const bootcampRouter = Router();
import {verifyToken} from '../middleware/auth.js';

bootcampRouter.post('/api/bootcamp',verifyToken,createBootcamp);
bootcampRouter.post('/api/bootcamp/adduser',verifyToken,addUser);
bootcampRouter.get('/api/bootcamp/:id',verifyToken, findBootcampById);
bootcampRouter.get('/api/bootcamp/',findAllBootcamp);

export default bootcampRouter;