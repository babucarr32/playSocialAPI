import User from "../../models/User";
import Post from "../../models/Post";
import { PostType, UserType } from "../../types/typesVar";
import { isUserAuth } from "../../actions/checkAuth";

export const getUser = {
  async user(_: any, { ID }: UserType, context: any) {
    isUserAuth(context);
    return await User.findById(ID);
  },
};

export const getUsers = {
  async users() {
    return await User.find();
  },
};

export const getPost = {
  async post(_: any, { ID }: PostType) {
    return await Post.findById(ID);
  },
};

export const getPosts = {
  async posts() {
    return await Post.find();
  },
};
