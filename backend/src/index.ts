import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import salesRoutes from './routes/sales.js';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';

// data imports
// import User from './models/User.js';
// import Product from './models/Product.js';
// import ProductStat from './models/ProductStat.js';
// import Transaction from './models/Transaction.js';
// import OverallStat from './models/OverallStat.js';
// import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat } from './data/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/sales", salesRoutes);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);

const PORT = process.env.PORT || 9000;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url!)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server running on PORT', PORT);
        });
        // User.insertMany(dataUser);
        // Product.insertMany(dataProduct);
        // OverallStat.insertMany(dataOverallStat);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
    })
    .catch((error) => {
        console.log("Something went wrong", error);
    });
