const mongoose = require("mongoose");
const Counselor = require("./models/counselor"); //  <--- This is the Counselor schema object that connects to the 'counselors' mongodb category.
//        We can use .find() on it to retrieve the dataTable.

mongoose.connect(
  "mongodb+srv://new_user_1:6qNfCI7iIKUrBOgJ@cluster0.x5k4p.mongodb.net/userDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

module.exports = (Mongo) => {
  /**
   * Returns a object containing query metadata
   */
  Mongo.countDocuments = (query, options) => {
    return new Promise((resolve, reject) => {
      Counselor.find(parseQuery(query))
        .then((data) => {

          let maxPrice = Math.max.apply(Math, data.map((entry) => { return entry.price; }))
          let minPrice = Math.min.apply(Math, data.map((entry) => { return entry.price; }))
            
          resolve({
            total: data.length,
            maxPrice: maxPrice,
            minPrice: minPrice
          })
        }
        )
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  Mongo.find = (query, options) => {
    return new Promise((resolve, reject) => {
      // Some usefule mongo-db syntax
      // Counselor.find({ age:{$gt:40}})   <----- returns counselors with age > 40

      Counselor.find(parseQuery(query))
        .sort({ price: 1 }) // <--- TODO: implement logic to dynamically sort, instead of just sorting by price.
        //            note that sort=1 means data will go from lowest to highest.

        .skip(options.skip)
        .limit(options.limit)
        .then((counselorData) => {
          // console.log({counselor})
          resolve(counselorData);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  function parseQuery(query) {
    let parsedQuery = {};
    for (const [key, value] of Object.entries(query)) {
      parsedQuery[key] = value.includes(",") ? value.split(",") : value;
      if (key === "price") parsedQuery[key] = { $lte: parsedQuery[key] };
    }
    // console.log({parsedQuery})
    return parsedQuery;
  }
};