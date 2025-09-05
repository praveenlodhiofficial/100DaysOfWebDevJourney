import mongoose, { model, models, Schema } from "mongoose";

interface IMedicalRecord {

}

const medicalRecordSchema = new Schema<IMedicalRecord>({

}, {timestamps: true})

const MedicalRecord = models.MedicalRecord || model<IMedicalRecord>('MedicalRecord', medicalRecordSchema)

export default MedicalRecord