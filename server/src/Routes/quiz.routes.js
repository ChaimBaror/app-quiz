

import  express  from 'express';
const router = express.Router();

import { getQuizzesController, getCategoryController } from '../Controllers/quiz-controlle.js';



router.get('/', getQuizzesController);

router.get('/categories', getCategoryController);


// Define routes and middleware

export default router;