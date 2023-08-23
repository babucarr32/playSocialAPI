import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import { createPost, createUser } from "./queries/resolversMutation";
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

    async followUser(_: any, { info }: FollowType) {
      try {
        if (info.action == "follow") {
          await User.updateOne(
            { _id: info.followed_id },
            {
              $addToSet: {
                followers: {
                  follower_id: info.follower_id,
                  fullName: info.fullName,
                },
              },
            }
          );
        } else {
          await User.updateOne(
            { _id: info.followed_id },
            {
              $pull: {
                followers: {
                  follower_id: info.follower_id,
                  fullName: info.fullName,
                },
              },
            }
          );
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    async likeOrDislikePost(_: any, { info }: LikeOrDislikeType) {
      console.log("action is ", info.fullName);
      try {
        if (info.action == "like") {
          await Post.updateOne(
            { _id: info.post_id },
            {
              $addToSet: {
                likes: { user_id: info.user_id, fullName: info.fullName },
              },
            }
          );
        }
        return info.action;
      } catch (error) {
        return "Ooh ohh! something went wrong";
      }
    },
  },
};
