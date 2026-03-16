import mongoose, { type Model } from "mongoose";

export interface IVisitor {
  totalViews: number;
  todayViews: number;
  lastUpdated: Date;
}

const visitorSchema = new mongoose.Schema<IVisitor>(
  {
    totalViews: { type: Number, default: 0 },
    todayViews: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const Visitor: Model<IVisitor> =
  (mongoose.models.Visitor as Model<IVisitor>) ||
  mongoose.model<IVisitor>("Visitor", visitorSchema);

export default Visitor;
