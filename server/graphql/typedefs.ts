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

type Post{
    title: String!
    description:String!
    images: [String]
    likes: [Like]
    dislikes: [Like]
    comments: [Comment]
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
    post_id: ID!
}

type Query{
    user(ID: ID!): User
    users: [User]
    post: Post
    posts: [Post]
}
`;
