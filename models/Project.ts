import mongoose, { type Model } from "mongoose";

export interface IProject {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveDemo: string;
  image: string;
  isVisible: boolean;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: { type: [String], required: true },
    githubLink: { type: String, required: true, trim: true },
    liveDemo: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    isVisible: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

export const Project: Model<IProject> =
  (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>("Project", projectSchema);

export default Project;
