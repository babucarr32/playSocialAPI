import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import { createPost, createUser } from "./queries/resolversMutation";
import { FollowType } from "../types/typesVar";
import User from "../models/User";

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

    async followUser(_: any, { info }: FollowType) {
      try {
        await User.updateOne(
          { _id: info.followed_id },
          { $addToSet: { followers: { user_id: info.follower_id } } }
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
