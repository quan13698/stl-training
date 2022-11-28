import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    productCode: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,

    },
    status: {
        type: String,
        default: 'created',
    }
})

export interface Order extends Document {
    name: string;
    phone: string;
    productCode:string;
    quantity: number;
    price: number;
    status: string;
}