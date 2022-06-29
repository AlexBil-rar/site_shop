import express from 'express'
import dotenv from "dotenv";
import path from 'path';
import colors from "colors";
import morgan from 'morgan';
import mongoose  from'mongoose'

import { notFound, errorHandler } from './middleware/error.middleware.js';
import orderController from './controllers/order.controller.js';
import authRoutes from './routes/auth.routes.js';
import newsRoutes from './routes/news.router.js'
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import categoryRoutes from './routes/category.routes.js';
import brandRoutes from './routes/brand.Routes.js';
import sliderRoutes from './routes/slider.routes.js'

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.get("/", (req, res) => {
    res.send("API запущен...");
});

app.use("/api/slider", sliderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", orderController.payingOrder);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use(notFound);
app.use(errorHandler);

//mongodb+srv://admin:eNWlzvaIIMo1xpPW@cluster0.tzrf4.mongodb.net/lite_shop?retryWrites=true&w=majority

const PORT = 8000;

const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://admin:eNWlzvaIIMo1xpPW@cluster0.tzrf4.mongodb.net/lite_shop?retryWrites=true&w=majority')
            .then( () => console.log('MongoDB started'.green.bold) )
            .catch(error => console.log(error))
        app.listen(PORT, () => console.log(`Server started on ${PORT} `.yellow.bold))
    } catch (e) {
        console.log(e);
    }
};


connectDB();