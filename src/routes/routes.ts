import express from 'express';
import { homeController } from '../controllers/home';
import { error404, errorHandler } from '../utils/error';
import { searchController } from '../controllers/search';
import { compareController } from '../controllers/compare';


const router = express.Router();

router.get('/home', homeController);
router.get('/search', searchController);
router.post('/compare', compareController);

router.use(errorHandler);

router.use('/', error404);



export default router;