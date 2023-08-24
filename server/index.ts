import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";
import { connectDB } from "./utils/connectDB";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(cookieParser());

async function connectToDatabase() {
  await connectDB();
}
connectToDatabase();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({ req, res }),
    listen: { port: 4000 },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
    `);
}
startApolloServer();
