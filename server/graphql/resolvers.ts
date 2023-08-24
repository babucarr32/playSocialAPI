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
import { EditAccount, Login } from "../types/typesVar";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { handleGenerateToken } from "../actions/generateToken";

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
        return result;
      } catch (error: any) {
        if (error.codeName) {
          throw new Error("Username already exist");
        }
        throw new Error(error.message);
      }
    },
    async login(_: any, { credentials }: Login) {
      const result = await User.findOne({ email: credentials.email });
      if (result) {
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          result.password as any
        );
        if (isPasswordMatch) {
          const accessToken = handleGenerateToken(result.email as any);
          return { id: result._id, ...result._doc, accessToken };
        }
      }
      throw new Error("Username or password incorrect");
    },
  },
};
