import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface PostType extends Document {
  title: string;
  description: string;
  images: [string];
  likes: [Like];
  dislikes: [Like];
  comments: [Comment];
}
interface Like {
  user_id: string;
}

interface Comment {
  comment: string;
  user_id: string;
  post_id: string;
  likes: [Like];
  dislikes: [Like];
}

export interface PostModel extends Model<PostType> {}

const postSchema = new Schema({
  title: { type: String },
  description: { type: String },
  images: { type: [], default: [] },
  likes: {
    type: [{ user_id: { type: String } }],
    default: [],
  },
  dislikes: {
    type: [{ user_id: { type: String } }],
    default: [],
  },
  comments: {
    type: [
      {
        comment: String,
        user_id: String,
        post_id: String,
        likes: {
          type: [{ user_id: { type: String } }],
          default: [],
        },
        dislikes: {
          type: [{ user_id: { type: String } }],
          default: [],
        },
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
