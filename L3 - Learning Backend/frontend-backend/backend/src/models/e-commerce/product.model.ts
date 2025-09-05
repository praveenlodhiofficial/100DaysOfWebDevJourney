import mongoose, { model, models, Schema, Types } from "mongoose";

interface IProduct {
    name: string,
    description: string,
    productImage: string,
    price: number,
    stock: number,
    category: Types.ObjectId,
    owner: Types.ObjectId,
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'product_name is required'],
    },
    description: {
        type: String,
        required: [true, 'product_description is required'],
    },
    productImage: {
        type: String,
        required: [true, 'product_image is required'],
    },
    price: {
        type: Number,
        default: 0,
        required: [true, 'product_price is required'],
    },
    stock: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'product_category is required'],

    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'product_owner is required'],
    },
}, { timestamps: true})

const Product = models.Product || model<IProduct>('Product', productSchema)

export default Product