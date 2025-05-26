import mongoose, { Document, Schema } from "mongoose";
import { ProblemCategory } from "../enums/ProblemCategory";

export interface IProblem extends Document {
  basecourseId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  problemLink: string;
  videoLink: string;
  category: ProblemCategory;
}

const ProblemSchema = new Schema<IProblem>({
  basecourseId: {type: mongoose.Schema.Types.ObjectId,ref: "Basecourse",required: true,},
  category: { type: String, enum: Object.values(ProblemCategory),required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {type: String,enum: ["easy", "medium", "hard"],required: true,},
  problemLink: { type: String, required: true },
  videoLink: { type: String, required: true },
});

export const Problem = mongoose.model<IProblem>("Problem", ProblemSchema);



