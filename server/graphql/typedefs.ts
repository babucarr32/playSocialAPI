export const typeDefs = `#graphql
type User{
    username: String!
    fullName: String!
    email: String!
    password: String!
    followers: [Follow]
    profileImage: String
    coverImage: String
}

input CreateUser{
    username: String!
    fullName: String!
    email: String!
    password: String!
}


type Post{
    id: String
    author: String!
    title: String!
    description:String!
    images: [String]
    likes: [Like]
    dislikes: [Like]
    comments: [Comment]
}

input CreatePost{
    author: String
    title: String!
    description:String!
    images: [String]
}

type Follow{
    follower_id: String
    fullName: String
}

type Comment{
    comment: String!
    user_id: ID!
    fullName: ID!
    likes: [Like]
    dislikes: [Like]
}

type Like{
    user_id: ID!
    fullName: String
}

input FollowUser{
    followed_id: ID
    follower_id: ID
    fullName: String
    action: String
}

input LikeOrDislikePost{
    user_id: ID!
    fullName: String!
    post_id: ID!
    action: String!
}

input CommentPost{
    comment: String!
    user_id: String!
    post_id: String!
    fullName: String!
}

type Query{
    user(ID: ID!): User
    users: [User]
    post(ID: ID!): Post
    posts: [Post]
}

type Mutation{
    createUser(credentials: CreateUser): User
    createPost(postInfo: CreatePost): Post
    followUser(info: FollowUser): Boolean
    likeOrDislikePost(info: LikeOrDislikePost): String
    commentPost(info: CommentPost): String
}
`;
