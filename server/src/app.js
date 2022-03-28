import http from "http";
import express from "express";
import cors from "cors";

import { sessionMiddleware } from "./session.js";
import { server as graphqlApp } from "./graphql.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
  })
);

app.use(sessionMiddleware);

// Merge graphql server with express app
graphqlApp.applyMiddleware({ app, cors: false });

const httpServer = http.createServer(app);
graphqlApp.installSubscriptionHandlers(httpServer);

export default httpServer;
