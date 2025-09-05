import mongoose, { model, models, Schema } from "mongoose";

interface IHospital {

}

const hospitalSchema = new Schema<IHospital>({

}, {timestamps: true})

const Hospital = models.Hospital || model<IHospital>('Hospital', hospitalSchema)

export default Hospital