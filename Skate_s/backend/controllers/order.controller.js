import asyncHandler from 'express-async-handler';
import Order from '../models/order.model.js';
import dotenv from "dotenv"
import User from '../models/user.model.js'

const orderController = {};

dotenv.config();

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
orderController.createOrder = asyncHandler(async (req, res) => {
    const { orderItems,
        shippingAddress,
        paymentMethod,
        productsPrice,
        shipingPrice,
        taxPrice,
        totalPrice } = req.body;
    
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("Нет товаров для заказа");
            return;
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                productsPrice,
                shipingPrice,
                taxPrice,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
});

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
orderController.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error(`Заказ ${req.params.id} не найден`);
    }
});



orderController.updateTotalBuy = asyncHandler(async (req, res) => {
    const { totalBuy } = req.body;

    const user = await User.findById(req.params.id);

    if (user) {
        user.totalBuy = totalBuy
        const updateduser = await user.save();
        res.json(updateduser);
    } else {
        res.status(404);
        throw new Error("Товар не найден");
    }
});


// @desc     Update status of order for paying
// @route    PUT /api/orders/:id/pay
// @access   Private
orderController.updateStatusOrderForPaying = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error(`Заказ ${req.params.id} не найден`);
    }
});

// @desc     Update status of order for delivering
// @route    PUT /api/orders/:id/deliver
// @access   Private/Admin
orderController.updateStatusOrderForDelivering = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error(`Заказ ${req.params.id} не найден`);
    }
});

// @desc     Get user's orders
// @route    GET /api/orders/myorders
// @access   Private
orderController.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc     Paying Order through PayPal
// @route    GET /api/config/paypal
// @access   Public
orderController.payingOrder = (req, res) => {
    res.send("AbdH942EW77qcTiNdal1JAFkpyynNUqgfgMfUwYeLfPbzLCp5GLXIJYl7SPI-28aQHH1ncvdgEOIh1Fm"  );
};


export default orderController;