import mongoose, { model, models, Schema, Types } from "mongoose";

type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
type Gender = 'MALE' | 'FEMALE' | 'OTHERS';

interface IPatient {
    name: string;
    diagnosedWith: string;
    address: string;
    age: number;
    bloodGroup: BloodGroup;
    gender: Gender;
    admittedIn: Types.ObjectId;
}

const patientSchema = new Schema<IPatient>({
    name: {
        type: String,
        required: [true, "patient_name is required"]
    },
    diagnosedWith: {
        type: String,
        required: [true, "diagnosed_with field is required"]
    },
    address: {
        type: String,
        required: [true, "patient_address is required"]
    },
    age: {
        type: Number,
        required: [true, "patient_age is required"]
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: [true, "patient_blood_group is required"]
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHERS'],
        required: [true, "patient_gender is required"]
    },
    admittedIn: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: [true, "patient_hospital_name is required"]
    },
}, { timestamps: true });

const Patient = models.Patient || model<IPatient>('Patient', patientSchema);

export default Patient;
