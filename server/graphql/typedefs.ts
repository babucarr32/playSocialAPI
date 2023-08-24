export const typeDefs = `#graphql
"This type is used as a return type for the fetched user(s) from the db."
type User{
    id: ID!
    username: String!
    fullName: String!
    email: String!
    followers: [Follow]
    profileImage: String
    coverImage: String
}
"This type is used as a return type for the logged in user."
type LoggedInUser{
    id: ID!
    username: String
    fullName: String
    email: String
    profileImage: String
    coverImage: String
    accessToken: String
}
"This type is used as a argument type for creating a user."
input CreateUser{
    username: String!
    fullName: String!
    email: String!
    password: String!
}
"This type is used as a argument type for editing a user's account."
input EditAccount{
    id: ID!
    username: String
    fullName: String
    profileImage: String
    coverImage: String
}
"This type is used as a return type for the fetched post(s) from the db."
type Post{
    id: String!
    author: String!
    title: String!
    description:String!
    images: [String]
    likes: [Like]
    dislikes: [Like]
    comments: [Comment]
}
"This type is used as a argument type for creating a post."
input CreatePost{
    author: String!
    title: String!
    description:String!
    images: [String]
}
"This type is used as a argument type for editing a post."
input EditPost{
    post_id: String
    title: String
    description:String
    images: [String]
}
"This type is used as a argument type for following a user."
type Follow{
    follower_id: String
    fullName: String
}
"This type is used for returning a comment type in a post."
type Comment{
    comment: String!
    user_id: ID!
    fullName: ID!
    likes: [Like]
    dislikes: [Like]
}
"This type is used for liking or disliking in a post."
type Like{
    user_id: ID!
    fullName: String
}
"This type is used as a argument type for signing in a user."
input Login{
    email: String!
    password: String!
}

"This type is used as a argument type for following a user."
input FollowUser{
    followed_id: ID
    follower_id: ID
    fullName: String
    action: String
}
"This type is used as a argument type for liking or disliking a post."
input LikeOrDislikePost{
    user_id: ID!
    fullName: String!
    post_id: ID!
    action: String!
}
"This type is used as a argument type for commenting in a post."
input CommentPost{
    comment: String!
    user_id: String!
    post_id: String!
    fullName: String!
}
"This type is used as a argument type for editing a comment in a post."
input UpdateCommentPost{
    comment: String!
    user_id: String!
    post_id: String!
    comment_id: String!
}
"This type is used as a argument type for deleting comment in a post."
input DeleteComment{
    user_id: String!
    post_id: String!
    comment_id: String! 
}

type Query{
    "Get single user by passing _id"
    user(ID: ID!): User
    "Get all posts"
    users: [User]
    "Get single post by passing the _id"
    post(ID: ID!): Post
    "Get all posts"
    posts: [Post]
}

type Mutation{
    "Sign in user"
    login(credentials: Login):LoggedInUser
    "Create account for user"
    createUser(credentials: CreateUser): User
    "Edit account information"
    editAccount(credentials: EditAccount): User
    "Create a post"
    createPost(postInfo: CreatePost): Post
    "Edit a post"
    editPost(postInfo: EditPost): Post
    "Follow a user"
    followUser(info: FollowUser): Boolean
    "Like or Dislike a post"
    likeOrDislikePost(info: LikeOrDislikePost): String
    "Comment in a post"
    commentPost(info: CommentPost): String
    "Update a (only the current users comment) comment"
    updateCommentPost(info: UpdateCommentPost): String
    "Delete a (only the current users comment) comment"
    deleteComment(info: DeleteComment): Boolean
}
`;
