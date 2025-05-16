import mongoose, { Document, Schema } from "mongoose";
import { Category } from "../enums/Category";
import { PhaseEnum, PhaseKey } from "../enums/Phase";

export interface IBaseCourse extends Document {
  title: string;
  description: string;
  category: Category;
  phase:PhaseKey
  subtitle: mongoose.Types.ObjectId[];
  problems: mongoose.Types.ObjectId[];
}

const BaseCourseSchema = new Schema<IBaseCourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: Object.values(Category), required: true },
   phase: { type: String, enum: Object.keys(PhaseEnum), required: true },
  subtitle: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtopic" }],
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }]
});

BaseCourseSchema.pre<IBaseCourse>("save", function (next) {
  if (this.category === Category.WEB) {
    this.problems = [];
  } else if (this.category === Category.PROBLEM) {
    this.subtitle = [];
  }
  next();
});

BaseCourseSchema.set("toJSON", {
  transform: function (doc, ret) {
    if (ret.category === Category.WEB) {
      delete ret.problems;
    } else if (ret.category === Category.PROBLEM) {
      delete ret.subtitle;
    }
    return ret;
  }
});


export const Basecourse = mongoose.model<IBaseCourse>("Basecourse", BaseCourseSchema);
