import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface Follow {
  user_id: String;
}

export interface UserType extends Document {
  username: { type: string };
  fullName: { type: string };
  email: { type: string };
  password: { type: string };
  followers: {
    type: [Follow];
  };
  profileImage: { type: string };
  coverImage: { type: string };
}

export interface UserModel extends Model<UserType> {}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: { type: [] },
  profileImage: { type: String, default: "" },
  coverImage: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  next();

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

let User: UserModel;
try {
  User = mongoose.model<UserType, UserModel>("users");
} catch (e) {
  User = mongoose.model<UserType, UserModel>("users", userSchema);
}

export default User;
