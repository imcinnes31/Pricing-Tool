// This is another way of importing modules.
const express = require("express");
const cors = require("cors");
const server = express();

// Checks the environment of the server to look for the config settings to check for the correct port. If it doesn't exist, use 5000 instead.
const port = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());

require('./routes/counselors.route.js')(server);

const listener = server.listen(port, () =>
  console.log(`Server is running on localhost:${port}`)
);
