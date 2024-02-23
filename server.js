// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("Server is running");

//   return response.end();
// });

// server.listen(3333);

import { fastify } from "fastify";

const server = fastify();

server.get("/", () => {
  return "Server is running at PORT 3333";
});

server.listen({
  port: 3333,
});
