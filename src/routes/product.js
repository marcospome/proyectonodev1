import express from 'express';
import { createProduct, listProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', createProduct);
router.get('/list', listProducts);

export default router;
