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
    user_id: String!
}

type Comment{
    comment: String!
    user_id: ID!
    post_id: ID!
    likes: [Like]
    dislikes: [Like]
}

type Like{
    user_id: ID!
}

input FollowUser{
    followed_id: ID
    follower_id: ID
    action: String
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
}
`;
