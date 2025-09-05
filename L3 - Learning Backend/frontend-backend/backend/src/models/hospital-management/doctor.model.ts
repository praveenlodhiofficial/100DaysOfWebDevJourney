import mongoose, { model, models, Schema } from "mongoose";

interface IDoctor {
    name: string,
    salary: string,
    qualification: string,
    experienceInYears: number,
    worksInHospital: []
}

const doctorSchema = new Schema<IDoctor>({
    name: {
        type: String,
        required: [true, 'doctor_name is required']
    },
    salary: {
        type: String,
        required: [true, 'salary is required']
    },
    qualification: {
        type: String,
        required: [true, 'salary is required']
    },
    experienceInYears: {
        type: Number,
        default: 0,
        required: [true, 'salary is required']
    },
    worksInHospital: [{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    }]
}, {timestamps: true})

const Doctor = models.Doctor || model<IDoctor>('Doctor', doctorSchema)

export default Doctor