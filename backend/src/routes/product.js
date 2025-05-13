import express from 'express';
import { createProduct, listProducts, deleteProduct, updateProduct} from '../controllers/productController.js';

const router = express.Router();

router.post('/add', createProduct);
router.get('/list', listProducts);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct)

export default router;
