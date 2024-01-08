import { Request, Response } from 'express';

import User from '../models/User.js';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.params?.id) {
            const { id } = req.params;

            const user = await User.findById(id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            res.status(400).json({ message: 'Invalid request: No ID provided' });
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};
