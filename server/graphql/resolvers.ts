import { data } from "../utils/db";
import User from "../models/User";
import Post from "../models/Post";

interface UserType {
  ID: any;
}

interface PostType {
  ID: any;
}
interface CreateUser {
  credentials: {
    username: String;
    fullName: String;
    email: String;
    password: String;
  };
}

interface CreatePost {
  postInfo: {
    title: string;
    description: string;
    images: [string];
  };
}

export const resolvers = {
  Query: {
    async user(_: any, { ID }: UserType) {
      return await User.findById(ID);
    },

    async users() {
      return await User.find();
    },

    async post(_: any, { ID }: PostType) {
      const res = data.posts.find((post) => post.id == ID);
      return res;
    },

    async posts() {
      return data.posts;
    },
  },
  Mutation: {
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

    async createPost(_: any, { postInfo }: CreatePost) {
      const createPost = new Post({ ...postInfo });
      const result = await createPost.save();

      return {
        title: result.title,
        description: result.description,
        images: result.images,
        likes: result.likes,
        dislikes: result.dislikes,
        comments: result.comments,
      };
    },
  },
};
