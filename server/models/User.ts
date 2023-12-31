import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface Follow {
  followed_id: String;
  follower_id: String;
  fullName: String;
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
  _doc: any;
}

export interface UserModel extends Model<UserType> {}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: {
    type: [
      {
        follower_id: { type: mongoose.Schema.ObjectId, ref: "users" },
        fullName: { type: String },
      },
    ],
  },
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
