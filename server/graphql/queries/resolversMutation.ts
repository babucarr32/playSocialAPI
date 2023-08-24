import {
  CommentPostType,
  CreatePost,
  CreateUser,
  DeleteCommentType,
  FollowType,
  LikeOrDislikeType,
} from "../../types/typesVar";
import User from "../../models/User";
import Post from "../../models/Post";
import { isUserAuth } from "../../actions/checkAuth";

const isUserLikedOrDisliked = async (
  field: string,
  id: string,
  userId: string,
  fullName: string
) => {
  const result = await Post.findOne({
    _id: id,
    [field]: {
      $elemMatch: {
        user_id: userId,
        fullName: fullName,
      },
    },
  });
  return result;
};

const likeOrDislikeVerify = async (
  field: string,
  id: string,
  userId: string,
  fullName: string
) => {
  let result = await isUserLikedOrDisliked(field, id, userId, fullName);
  if (result) throw new Error("Forbidden action...");
};

export const createUser = {
  async createUser(_: any, { credentials }: CreateUser, context: any) {
    isUserAuth(context);
    const createUser = new User({ ...credentials });
    const result = await createUser.save();
    return {
      username: result.username,
      fullName: result.fullName,
      email: result.email,
      password: result.password,
      followers: result.followers,
      profileImage: result.profileImage,
      coverImage: result.coverImage,
    };
  },
};

export const createPost = {
  async createPost(_: any, { postInfo }: CreatePost, context: any) {
    isUserAuth(context);
    const createPost = new Post({ ...postInfo });
    const result = await createPost.save();
    return {
      id: result._id,
      author: result.author,
      title: result.title,
      description: result.description,
      images: result.images,
      likes: result.likes,
      dislikes: result.dislikes,
      comments: result.comments,
    };
  },
};

export const followUser = {
  async followUser(_: any, { info }: FollowType, context: any) {
    isUserAuth(context);
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
};

export const likeOrDislikePost = {
  async likeOrDislikePost(_: any, { info }: LikeOrDislikeType, context: any) {
    isUserAuth(context);
    const handleLikeOrDislike = async (field: "likes" | "dislikes") => {
      await Post.updateOne(
        { _id: info.post_id },
        {
          $addToSet: {
            [field]: { user_id: info.user_id, fullName: info.fullName },
          },
        }
      );
    };

    const handleUndoLikeOrDislike = async (field: "likes" | "dislikes") => {
      await Post.updateOne(
        { _id: info.post_id },
        {
          $pull: {
            [field]: { user_id: info.user_id, fullName: info.fullName },
          },
        }
      );
    };

    const handleIsUserLikedOrDisliked = async (action: string) => {
      return await isUserLikedOrDisliked(
        action,
        info.post_id,
        info.user_id,
        info.fullName
      );
    };

    try {
      await likeOrDislikeVerify(
        info.action + "s",
        info.post_id,
        info.user_id,
        info.fullName
      );

      if (info.action == "like") {
        const result = await handleIsUserLikedOrDisliked("dislikes");
        if (result) await handleUndoLikeOrDislike("dislikes");
        await handleLikeOrDislike("likes");
      }

      if (info.action == "dislike") {
        const result = await handleIsUserLikedOrDisliked("likes");
        if (result) await handleUndoLikeOrDislike("likes");
        await handleLikeOrDislike("dislikes");
      }

      if (info.action == "undoLike") {
        await handleUndoLikeOrDislike("likes");
      }

      if (info.action == "undoDislike") {
        await handleUndoLikeOrDislike("dislikes");
      }
      return `${info.action} successful`;
    } catch (error: any) {
      return error.message;
    }
  },
};

export const commentPost = {
  async commentPost(_: any, { info }: CommentPostType, context: any) {
    isUserAuth(context);
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
};

export const updateCommentPost = {
  async updateCommentPost(_: any, { info }: CommentPostType, context: any) {
    isUserAuth(context);
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
};

export const deleteComment = {
  async deleteComment(_: any, { info }: DeleteCommentType, context: any) {
    isUserAuth(context);
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
};
