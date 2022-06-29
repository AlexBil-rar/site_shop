import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import News from '../models/news.model.js';
import Firms from '../models/firms.model.js';
import Category from '../models/category.model.js';
import Slider from '../models/slider.model.js';

const productController = {};

productController.getAllNews = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      },
      brand: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {};

    const count = await News.countDocuments({ ...keyword });
    const news = await News
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ news, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500);
    throw new Error('Ошибка при загрузке товаров');
  }
});

// @desc     Get all products
// @route    GET /api/products
// @access   Public
productController.getAllProducts = asyncHandler(async (req, res) => {
  try {
    let { brand, category, page } = req.query
    const pageSize = 8;
    page = Number(req.query.pageNumber) || 1;
    let products;
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {};
    if (!brand && !category) {
      products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
      return res.status(200).json({ total: products.length, products })
    }
    if (brand && !category) {
      products = await Product.find({ brand: brand, ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
      return res.status(200).json({ total: products.length, products })
    }
    if (!brand && category) {
      products = await Product.find({ category: category, ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
      return res.status(200).json({ total: products.length, products })
    }
    if (brand && category) {
      products = await Product.find({ brand: brand, category: category, ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
      return res.status(200).json({ total: products.length, products })
    }
    return res.json(products)
  } catch (error) {
    res.status(500);
    throw new Error('Ошибка при загрузке товаров');
  }
});

// @desc     Get products with top rating
// @route    GET /api/products/top
// @access   Public
productController.getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @desc     Get product by Id
// @route    GET /api/products/:id
// @access   Public
productController.getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  try {
    if (product) {
      res.json(product);
    } else {
      //res.status(404).json({msg: "Товар не найден"})
      res.status(404);
      throw new Error('Товар не найден');
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Товар с идентификатором ${productId} не найден`);
  }
});

// @route    GET /api/products/Firms


productController.getAllBrand = asyncHandler(async (req, res) => {
  const firms = await Firms.find()
  return res.json(firms)
});


productController.getAllSlider = asyncHandler(async (req, res) => {
  const slider = await Slider.find()
  return res.json(slider)
});


productController.getAllCategory = asyncHandler(async (req, res) => {
  const types = await Category.find()
  return res.json(types)
});


productController.getCategoryById = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    let { page } = req.query;

    const pageSize = 8;
    page = Number(page) || 1;

    const products = await Product.find({ 'category': id }).limit(pageSize).skip(pageSize * (page - 1));

    const pages = Math.ceil(products.length / pageSize);

    return res.status(200).json({
      pages,
      page,
      products
    })
  
  } catch (error) {
    res.status(500);
    throw new Error('Ошибка при загрузке товаров');
  }
});


productController.getBrandById = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    let { page } = req.query;

    const pageSize = 8;
    page = Number(page) || 1;

    const products = await Product.find({ 'brand': id }).limit(pageSize).skip(pageSize * (page - 1));

    const pages = Math.ceil(products.length / pageSize);

    return res.status(200).json({
      pages,
      page,
      products
    })
  
  } catch (error) {
    res.status(500);
    throw new Error('Ошибка при загрузке товаров');
  }
});

export default productController;