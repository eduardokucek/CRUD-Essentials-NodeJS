// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Server is running");

//   return response.end();
// });

// server.listen(3333);

// Fastify framework for Node.js
import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

// HTTP METHODS
// POST
server.post("/videos", (request, response) => {
  const { title, description, duration } = request.body;

  database.create({
    title,
    description,
    duration,
  });

  return response.status(201).send("Video created successfully");
});

// GET - all
server.get("/videos", (request, response) => {
  const search = request.query.search;

  const videos = database.list(search);

  return videos;
});

// GET - by ID
server.get("/videos/:id", (request, response) => {
  return `GET method with id: ${request.params.id}`;
});

// PATCH
server.patch("/videos/:id", (request, response) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return response.status(204).send("Video updated successfully");
});

// DELETE
server.delete("/videos/:id", (request, response) => {
  const videoId = request.params.id;
  database.delete(videoId);

  return response.status(204).send("Video deleted successfully");
});

server.listen({
  port: 3333,
});
