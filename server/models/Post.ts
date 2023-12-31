import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface PostType extends Document {
  author: string;
  title: string;
  description: string;
  images: [string];
  likes: [Like];
  dislikes: [Like];
  comments: [Comment];
}
interface Like {
  user_id: string;
  fullName: string;
}

interface Comment {
  comment: string;
  user_id: string;
  fullName: string;
  likes: [Like];
  dislikes: [Like];
}

export interface PostModel extends Model<PostType> {}

const postSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: { type: String },
  description: { type: String },
  images: { type: [], default: [] },
  likes: {
    type: [{ user_id: { type: String }, fullName: { type: String } }],
    default: [],
  },
  dislikes: {
    type: [{ user_id: { type: String }, fullName: { type: String } }],
    default: [],
  },
  comments: {
    type: [
      {
        comment: { type: String },
        user_id: { type: String },
        fullName: { type: String },
      },
    ],
    default: [],
  },
});

let Post: PostModel;
try {
  Post = mongoose.model<PostType, PostModel>("posts");
} catch (error) {
  Post = mongoose.model<PostType, PostModel>("posts", postSchema);
}

export default Post;
