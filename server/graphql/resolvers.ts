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
  },
};
