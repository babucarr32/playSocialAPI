import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import {
  createPost,
  createUser,
  followUser,
  likeOrDislikePost,
} from "./queries/resolversMutation";
import { CommentPostType, DeleteCommentType } from "../types/typesVar";
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
    async commentPost(_: any, { info }: CommentPostType) {
      try {
        await Post.updateOne(
          { _id: info.post_id },
          {
            $addToSet: {
              comments: {
                comment: info.comment,
                user_id: info.user_id,
                fullName: info.fullName,
              },
            },
          }
        );
        return "Comment successful";
      } catch (error) {
        return "Ooh ohh! something went wrong";
      }
    },

    async updateCommentPost(_: any, { info }: CommentPostType) {
      try {
        await Post.updateOne(
          {
            _id: info.post_id,
            "comments._id": info.comment_id,
            "comments.user_id": info.user_id,
          },
          {
            $set: {
              "comments.$.comment": info.comment,
            },
          }
        );
        return "Updated comment successfully";
      } catch (error) {
        return "Bad request";
      }
    },

    async deleteComment(_: any, { info }: DeleteCommentType) {
      try {
        await Post.updateOne(
          { _id: info.post_id },
          {
            $pull: {
              comments: { _id: info.comment_id, user_id: info.user_id },
            },
          }
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
