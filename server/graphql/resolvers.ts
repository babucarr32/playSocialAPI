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
import { EditAccount, EditPostType, Login } from "../types/typesVar";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { handleGenerateToken } from "../actions/generateToken";
import { isUserAuth } from "../actions/checkAuth";
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
    ...commentPost,
    ...updateCommentPost,
    ...deleteComment,
    async editAccount(_: any, { credentials }: EditAccount, context: any) {
      isUserAuth(context);
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
    async editPost(_: any, { postInfo }: EditPostType, context: any) {
      isUserAuth(context);
      try {
        const result = await Post.findOneAndUpdate(
          { _id: postInfo.post_id },
          {
            title: postInfo.title,
            description: postInfo.description,
            images: postInfo.images,
          },
          { new: true }
        );
        return result;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
