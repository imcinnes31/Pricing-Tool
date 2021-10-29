const mongoose = require("mongoose");
const Counselor = require("./models/counselor"); //  <--- This is the Counselor schema object that connects to the 'counselors' mongodb category.
//        We can use .find() on it to retrieve the dataTable.

mongoose.connect(
  "mongodb+srv://Musone:mYvErYsEcUrEpAssWoRd132@pricingtool-cluster.yjalx.mongodb.net/PricingTool-Atlas-DB?retryWrites=true&w=majority",
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
      // Counselor.find({ age:{$gt:40}})   // <----- returns counselors with age > 40

      Counselor.find(parseQuery(query))
        .sort({ price: 1 }) // <--- TODO: implement logic to dynamically sort, instead of just sorting by price.
        //            note that sort=1 means data will go from lowest to highest.

        .skip(options.skip)
        .limit(options.limit)
        .then((counselorData) => {

          //console.log({counselor})
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
    var ageQueryArray = [];

    for (const [key, value] of Object.entries(query)) {
      if (key === "price") { 
        parsedQuery[key] = { $lte: value };
      } else if (key === "age") {
        //creates an "or" query to select age ranges given by the user's preference
        var ageArray = query["age"].split(",");
        for (let i = 0; i < ageArray.length; i += 2) {
          let newAgeQuery = {};
          let biggerAgeQuery = {};
          newAgeQuery["$gte"] = ageArray[i];
          newAgeQuery["$lte"] = ageArray[i + 1];
          biggerAgeQuery["age"] = newAgeQuery;
          ageQueryArray.push(biggerAgeQuery);
        }
        parsedQuery["$or"] = ageQueryArray;

      } else parsedQuery[key] = value.includes(",") ? { $in: value.split(",") } : value;
    }

    //console.log(parsedQuery);
    return parsedQuery;
  }



};