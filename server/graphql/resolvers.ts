import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import {
  createPost,
  createUser,
  followUser,
  likeOrDislikePost,
} from "./queries/resolversMutation";
import { CommentPostType } from "../types/typesVar";
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
        const result = await Post.findOne({
          _id: info.post_id,
          comments: {
            $elemMatch: {
              comment: info.comment,
              user_id: info.user_id,
              fullName: info.fullName,
            },
          },
        });

        if (result) return "Forbidden...";

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
  },
};
