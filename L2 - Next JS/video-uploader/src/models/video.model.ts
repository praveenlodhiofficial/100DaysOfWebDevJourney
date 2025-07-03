import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  title: string;
  description: string;
  videoURL: string;
  thumbnailURL: string;
  _id: mongoose.Types.ObjectId;
  controls?: Boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  UpdatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, "Please provide video title"],
    },
    description: {
      type: String,
      required: [true, "Please provide desciption"],
    },
    videoURL: {
      type: String,
      unique: true,
      required: [true, "Please provide video url"],
    },
    thumbnailURL: {
      type: String,
      required: [true, "Please provide video thumbnail"],
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.height },
      width: { type: Number, default: VIDEO_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;
