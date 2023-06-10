import { handleUserCreation, handleUserListing } from "./controllers/user.js";
import { handleStatusRoute } from "./controllers/status.js";

async function routes(server) {
  server.on("stream", (stream, headers) => {
    if (headers[":method"] === "GET" && headers[":path"] === "/")
      return handleStatusRoute(stream);

    if (headers[":method"] === "POST" && headers[":path"] === "/users")
      return handleUserCreation(stream);

    if (headers[":method"] === "GET" && headers[":path"].startsWith("/users")) {
      const path = headers[":path"].substring("/users".length);
      const url = new URL(`http://localhost${path}`);
      const params = new URLSearchParams(url.search);
      const itemsPerPage = parseInt(params.get("itemsPerPage")) || 10;
      const currentPage = parseInt(params.get("currentPage")) || 1;
      return handleUserListing(stream, itemsPerPage, currentPage);
    }

    stream.respond({
      "content-type": "application/json",
      ":status": 404,
    });
    stream.end(JSON.stringify({ error: "Rota não encontrada.", status: 404 }));
  });
}

export { routes };
