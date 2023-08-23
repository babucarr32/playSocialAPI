import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import {
  createPost,
  createUser,
  followUser,
  likeOrDislikePost,
} from "./queries/resolversMutation";
import { FollowType, LikeOrDislikeType } from "../types/typesVar";
import User from "../models/User";
import Post from "../models/Post";

export const resolvers = {
  Query: {
    ...getUser,
    ...getUsers,
    ...getPost,
    ...getPosts,
  },
  Mutation: {
    ...createUser,
    ...createPost,
    ...followUser,
    ...likeOrDislikePost,
  },
};
