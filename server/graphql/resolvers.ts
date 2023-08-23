import { data } from "../utils/db";

interface User {
  ID: any;
}

interface Post {
  ID: any;
}

export const resolvers = {
  Query: {
    async user(_: any, { ID }: User) {
      const res = data.users.find((user) => user.id == ID);
      return res;
    },

    async users() {
      return data.users;
    },

    async post(_: any, { ID }: Post) {
      const res = data.posts.find((post) => post.id == ID);
      return res;
    },

    async posts() {
      return data.posts;
    },
  },
};
