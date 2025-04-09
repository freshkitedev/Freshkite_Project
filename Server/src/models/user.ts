import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  role: "student" | "teacher" | "admin";
  purchasedCourses?: mongoose.Schema.Types.ObjectId[];
  batches?: mongoose.Schema.Types.ObjectId[];
  managedCourses?:  mongoose.Schema.Types.ObjectId[];
  managedTeachers?: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["student", "teacher", "admin"], required: true },

    // Student-specific fields
    purchasedCourses: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], default: undefined },

    // Teacher-specific fields
    batches: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }], default: undefined },

    // Admin-specific fields
    managedCourses: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], default: undefined },
    managedTeachers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: undefined },
  },
  { timestamps: true }
);

// Ensure role-based fields are always initialized
UserSchema.pre<IUser>("save", function (next) {
  // Remove empty fields to save memory
  if (this.role === "student") {
    this.purchasedCourses = this.purchasedCourses?.length ? this.purchasedCourses : [];
  } else if (this.role === "teacher") {
    this.batches = this.batches?.length ? this.batches : [];
  } else if (this.role === "admin") {
    this.managedCourses = this.managedCourses?.length ? this.managedCourses : [];
    this.managedTeachers = this.managedTeachers?.length ? this.managedTeachers : [];
    this.batches = this.batches?.length ? this.batches : [];
  }

  next();
});

export default mongoose.model<IUser>("User", UserSchema);
