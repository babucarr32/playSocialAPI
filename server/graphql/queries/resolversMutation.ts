import {
  CreatePost,
  CreateUser,
  FollowType,
  LikeOrDislikeType,
} from "../../types/typesVar";
import User from "../../models/User";
import Post from "../../models/Post";

const likeOrDislikeVerify = async (
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

  if (result) throw new Error("Forbidden action...");
};

export const createUser = {
  async createUser(_: any, { credentials }: CreateUser) {
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
  async createPost(_: any, { postInfo }: CreatePost) {
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
};

export const likeOrDislikePost = {
  async likeOrDislikePost(_: any, { info }: LikeOrDislikeType) {
    try {
      await likeOrDislikeVerify(
        info.action + "s",
        info.post_id,
        info.user_id,
        info.fullName
      );
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
      if (info.action == "dislike") {
        await Post.updateOne(
          { _id: info.post_id },
          {
            $addToSet: {
              dislikes: { user_id: info.user_id, fullName: info.fullName },
            },
          }
        );
      }

      if (info.action == "undoLike") {
        await Post.updateOne(
          { _id: info.post_id },
          {
            $pull: {
              likes: { user_id: info.user_id, fullName: info.fullName },
            },
          }
        );
      }

      if (info.action == "undoDislike") {
        await Post.updateOne(
          { _id: info.post_id },
          {
            $pull: {
              dislikes: { user_id: info.user_id, fullName: info.fullName },
            },
          }
        );
      }
      return `${info.action} successful`;
    } catch (error: any) {
      return error.message;
    }
  },
};
