import { Request, Response } from "express";

import OverallStat from "../models/OverallStat.js";

export const getSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const overallStats = await OverallStat.find();

        if (overallStats.length > 0) {
            res.status(200).json(overallStats[0]);
        } else {
            res.status(404).json({ message: 'No Customer found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};