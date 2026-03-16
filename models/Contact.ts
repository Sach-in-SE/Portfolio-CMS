import mongoose, { type Model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  isViewed: boolean;
}

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    isViewed: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

export const Contact: Model<IContact> =
  (mongoose.models.Contact as Model<IContact>) ||
  mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
