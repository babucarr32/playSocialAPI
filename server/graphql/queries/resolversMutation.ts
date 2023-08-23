import { CreatePost, CreateUser } from "../../types/typesVar";
import User from "../../models/User";
import Post from "../../models/Post";

export const createUser = {
  async createUser(_: any, { credentials }: CreateUser) {
    const createUser = new User({ ...credentials });
    const result = await createUser.save();
    return {
      username: result.username,
      fullName: result.fullName,
      email: result.email,
      password: result.password,
      followers: result.followers,
      profileImage: result.profileImage,
      coverImage: result.coverImage,
    };
  },
};

export const createPost = {
  async createPost(_: any, { postInfo }: CreatePost) {
    const createPost = new Post({ ...postInfo });
    const result = await createPost.save();
    return {
      author: result.author,
      title: result.title,
      description: result.description,
      images: result.images,
      likes: result.likes,
      dislikes: result.dislikes,
      comments: result.comments,
    };
  },
};
