// code away!
server = require("./server.js");

port = process.env.port || 8000;

server.listen(port, console.log(`Listening on port ${port}`));
