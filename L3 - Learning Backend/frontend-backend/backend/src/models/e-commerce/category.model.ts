import mongoose, { model, models, Schema } from "mongoose";

interface ICategory {
    name: string
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'category_name is required'],
    }

}, { timestamps: true})

const Category = models.Category || model<ICategory>('Category', categorySchema)

export default Category