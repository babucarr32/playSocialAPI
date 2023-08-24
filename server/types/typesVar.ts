export interface UserType {
  ID: any;
}

export interface PostType {
  ID: any;
}

export interface CreateUser {
  credentials: {
    username: String;
    fullName: String;
    email: String;
    password: String;
  };
}

export interface CreatePost {
  postInfo: {
    author: string;
    title: string;
    description: string;
    images: [string];
  };
}

export interface FollowType {
  info: {
    fullName: string;
    followed_id: string;
    follower_id: string;
    action: string;
  };
}

export interface LikeOrDislikeType {
  info: {
    action: "like" | "dislike" | "undoLike" | "undoDislike";
    post_id: string;
    user_id: string;
    fullName: string;
  };
}

export interface CommentPostType {
  info: {
    user_id: string;
    post_id: string;
    comment_id: string;
    comment: string;
    fullName: string;
  };
}
