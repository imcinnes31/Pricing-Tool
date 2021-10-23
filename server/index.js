// This is another way of importing modules.
const express = require("express");
const cors = require("cors");
const server = express();
const uuid = require("uuid");
const HttpError = require('./database/models/http-error');

const userRoutes = require('./routes/users.route');

const CounselorModel = require("./database/models/counselor");

// Checks the environment of the server to look for the config settings to check for the correct port. If it doesn't exist, use 5000 instead.
const port = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());

server.use('/api/users', userRoutes);
require('./routes/counselors.route.js')(server);

server.post("/api/insertCounselor", async (req, res) =>{
  const counselor_data = req.body;
  counselor_data.id = uuid.v4();
  counselor_data.roles = [];
  counselor_data.capacity = 0;
  counselor_data.in_person = null;
  counselor_data.test_data = null;
  try {
    await new CounselorModel(counselor_data).save();
  } catch (error) {
    console.log(error);
  }
});

server.use((req, res, next)=>{
  const error = new HttpError('Cloud not find this route.', 404);
  throw error;
})

server.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error occurred!"});

});

const listener = server.listen(port, () =>
  console.log(`Server is running on localhost:${port}`)
);

