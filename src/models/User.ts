import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
