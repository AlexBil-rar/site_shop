import express from 'express';
import productController from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", productController.getAllNews);

export default router;