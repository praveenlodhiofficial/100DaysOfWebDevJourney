import mongoose, { model, models, Schema, Types } from "mongoose";

interface IOrderItems {
    productId: Types.ObjectId;
}

interface IOrder {
    orderPrice: number;
    customer: Types.ObjectId;
    orderItems: IOrderItems[];
    address: string;
    status: 'PENDING' | 'CANCELLED' | 'DELIVERED';
}

const orderItemsSchema = new Schema<IOrderItems>({
    productId: {
        type: Schema.Types.ObjectId,
        required: [true, "product_id is required"],
        ref: "Product"
    }
});

const orderSchema = new Schema<IOrder>({
    orderPrice: {
        type: Number,
        required: [true, "order_price is required"],
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: [orderItemsSchema],
        required: true
    },
    address: {
        type: String,
        required: [true, "customer_address is required"],
    },
    status: {
        type: String,
        enum: ['PENDING', 'CANCELLED', 'DELIVERED'],
        default: 'PENDING'
    }
}, { timestamps: true });

const Order = models.Order || model<IOrder>('Order', orderSchema);

export default Order;
