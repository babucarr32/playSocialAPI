import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import {
  commentPost,
  createPost,
  createUser,
  deleteComment,
  followUser,
  likeOrDislikePost,
  updateCommentPost,
} from "./queries/resolversMutation";
import { EditAccount } from "../types/typesVar";
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
    ...followUser,
    ...likeOrDislikePost,
    ...commentPost,
    ...updateCommentPost,
    ...deleteComment,
    async editAccount(_: any, { credentials }: EditAccount) {
      try {
        const result = await User.findOneAndUpdate(
          { _id: credentials.id },
          {
            username: credentials.username,
            fullName: credentials.fullName,
            profileImage: credentials.profileImage,
            coverImage: credentials.coverImage,
          },
          { new: true }
        );
        console.log(result);

        return result;
      } catch (error) {
        return "ohh ohh, something went wrong.";
      }
    },
  },
};
