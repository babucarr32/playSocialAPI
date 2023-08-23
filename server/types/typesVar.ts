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
    title: string;
    description: string;
    images: [string];
  };
}