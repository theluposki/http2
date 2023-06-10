export function handleStatusRoute(stream) {
    stream.respond({
      "content-type": "text/html",
      ":status": 200,
    });
    stream.end("<h1>Hello, Luposki HTTP/2!</h1>");
  }
  