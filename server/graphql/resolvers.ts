import { data } from "../utils/db";
import User from "../models/User";

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

export const resolvers = {
  Query: {
    async user(_: any, { ID }: UserType) {
      const res = data.users.find((user) => user.id == ID);
      return res;
    },

    async users() {
      return data.users;
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
      console.log(result);
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
  },
};
