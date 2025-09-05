import { Schema, model, models } from "mongoose"

interface INotes {
    title: string
    description: string
}

const notesSchema = new Schema<INotes>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export const Notes = models.Notes || model<INotes>("Notes", notesSchema)