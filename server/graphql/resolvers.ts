import { data } from "../utils/db";

interface User {
  ID: any;
}

export const resolvers = {
  Query: {
    async user(_: any, { ID }: User) {
      const res = data.users.find((user) => user.id == ID);
      return res;
    },
  },
};
