import { Request, Response } from 'express';

import User from '../models/User.js';
import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
import getCountryIso3 from 'country-iso-2-to-3';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stats = await ProductStat.find({
                    productId: product._id
                });

                return {
                    ...product.toJSON(),
                    stats
                }
            })
        );

        if (productsWithStats.length > 0) {
            res.status(200).json(productsWithStats);
        } else {
            res.status(404).json({ message: 'No Product found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await User.find({ role: 'user' }).select('-password');

        if (customers.length > 0) {
            res.status(200).json(customers);
        } else {
            res.status(404).json({ message: 'No Customer found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        const generateSort = (sort) => {
            const sortParsed = sort ? JSON.parse(sort) : null;
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort === "asc" ? 1 : -1),
            };

            return sortFormatted;
        };

        const sortFormatted = Boolean(sort) ? generateSort(sort) : {};

        // Assuming Transaction is a mongoose model
        const data = await Transaction.find({
            $or: [{
                cost: { $regex: new RegExp(search.toString(), "i") },
                userId: { $regex: new RegExp(search.toString(), "i") },
            }],
        })
        // .sort(sortFormatted)
        .skip(parseInt(page.toString()) * parseInt(pageSize.toString()))
        .limit(parseInt(pageSize.toString()));

        const total = await Transaction.countDocuments();

        // const total = await Transaction.countDocuments({
        //     name: { $regex: search, $options: "i" }
        // });

        if (data.length > 0) {
            res.status(200).json({
                data,
                total
            });
        } else {
            res.status(404).json({ message: 'No Transaction found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getGeography = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, item) => {
            const countryISO3 = getCountryIso3(item?.country);

            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }

            acc[countryISO3] ++;

            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return { id: country, value: count }
        });

        if (formattedLocations.length > 0) {
            res.status(200).json(formattedLocations);
        } else {
            res.status(404).json({ message: 'No Transaction found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};