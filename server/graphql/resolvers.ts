import { getPost, getPosts, getUser, getUsers } from "./queries/resolversQuery";
import {
  commentPost,
  createPost,
  createUser,
  deleteComment,
  editAccount,
  editPost,
  followUser,
  likeOrDislikePost,
  login,
  updateCommentPost,
} from "./queries/resolversMutation";

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
    ...editAccount,
    ...login,
    ...editPost,
  },
};
