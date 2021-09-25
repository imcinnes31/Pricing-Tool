// This is another way of importing modules.
const express = require("express");
const cors = require("cors");
const server = express();

const CounselorModel = require("./database/models/counselor");
// Checks the environment of the server to look for the config settings to check for the correct port. If it doesn't exist, use 5000 instead.
const port = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());

require('./routes/counselors.route.js')(server);

server.post("/api/insertCounselor", async (req, res) =>{
  const counselor_data = req.body;
  try {
    await new CounselorModel(counselor_data).save();
  } catch (error) {
    console.log(error);
  }
});
const listener = server.listen(port, () =>
  console.log(`Server is running on localhost:${port}`)
);

