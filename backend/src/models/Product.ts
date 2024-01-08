import mongoose from "mongoose";

interface UserI {
    name: string;
    price: number;
    rating: number;
    supply: number;
    category: string;
    description: string;
}

const ProductSchema = new mongoose.Schema<UserI>({
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number
    
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;