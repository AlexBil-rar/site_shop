import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import News from '../models/news.model.js'
import Slider from '../models/slider.model.js';
import Firms from '../models/firms.model.js'

const adminController = {};

// @desc     Get all users
// @route    GET /api/admin/users
// @access   Private/Admin
adminController.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc     Get users by id
// @route    GET /api/admin/users/:id
// @access   Private/Admin
adminController.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("Пользователь не найден")
    }
});

// @desc     Update user
// @route    PUT /api/admin/users/:id
// @access   Private/Admin
adminController.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });

    } else {
        res.status(404);
        throw new Error('Пользователь не найден');
    }
});

// @desc     Delete user
// @route    DELETE /api/admin/users/:id
// @access   Private/Admin
adminController.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'Пользователь успешно удален' });
    } else {
        res.status(404);
        throw new Error("Пользователь не найден");
    }
});

adminController.createBrands = asyncHandler(async (req, res) => {
    const { category, 
            img } = req.body;
    
    const existBrands = await Firms.findOne({ category });

    if (existBrands) {
        res.status(400);
        throw new Error("Новость с таким названием уже существует");
    } 

    const brand = new Firms({
        category, 
        img, 
    });

    const createBrands = await brand.save();
    res.status(201).json(createBrands);

    })

adminController.createNews = asyncHandler(async (req, res) => {
    const { name, 
            description, 
            image } = req.body;
    
    const existNews = await News.findOne({ name });

    if (existNews) {
        res.status(400);
        throw new Error("Новость с таким названием уже существует");
    } 

    const news = new News({
        name, 
        description, 
        image, 
    });

    const createNews = await news.save();
    res.status(201).json(createNews);

    })

// Slider

adminController.createSlider = asyncHandler(async (req, res) => {
    const { name,
            image } = req.body;

    const existSlider = await Slider.findOne({ name });

    if (existSlider) {
        res.status(400);
        throw new Error("Товар с таким названием уже существует");
    } 

    const slider = new Slider({
        name,  
        image,
    });

    const createSlider = await slider.save();
    res.status(201).json(createSlider);
    
});





// @desc     Create a product
// @route    POST /api/admin/products
// @access   Private/Admin
adminController.createProduct = asyncHandler(async (req, res) => {
    const { name, 
            description, 
            image, 
            price, 
            countInStock, 
            brand, 
            category } = req.body;

    const existProduct = await Product.findOne({ name });

    if (existProduct) {
        res.status(400);
        throw new Error("Товар с таким названием уже существует");
    } 

    const product = new Product({
        user: req.user._id,
        name, 
        description, 
        image, 
        price, 
        countInStock, 
        brand, 
        category,
        numReviews: 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
    
});


adminController.updateNews = asyncHandler(async (req, res) => {
    const { name, 
            description, 
            image } = req.body;

    const news = await News.findById(req.params.id);

    if (news) {
        news.name = name;
        news.description = description;
        news.image = image;

        const updatedNews = await news.save();
        res.json(updatedNews);
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
    
});

// @desc     Update product
// @route    PUT /api/admin/products/:id
// @access   Private/Admin
adminController.updateProduct = asyncHandler(async (req, res) => {
    const { name, 
            description, 
            image, 
            price, 
            countInStock, 
            brand, 
            category } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.description = description;
        product.image = image;
        product.price = price;
        product.countInStock = countInStock;
        product.brand = brand;
        product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
    
});

adminController.deleteBrands = asyncHandler(async (req, res) => {
    const brand = await Firms.findById(req.params.id);
    if (brand) {
        await brand.remove();
        res.json({ message: 'Новость успешно удален' });
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
});


adminController.deleteNews = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id);
    if (news) {
        await news.remove();
        res.json({ message: 'Новость успешно удален' });
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
});


// Slider

adminController.deleteSlider = asyncHandler(async (req, res) => {
    const slider = await Slider.findById(req.params.id);
    if (slider) {
        await slider.remove();
        res.json({ message: 'Товар успешно удален' });
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
});

// @desc     Delete product
// @route    DELETE /api/admin/products/:id
// @access   Private/Admin
adminController.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Товар успешно удален' });
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
});

// @desc     Get all orders
// @route    GET /api/admin/orders
// @access   Private/Admin
adminController.getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});


export default adminController;