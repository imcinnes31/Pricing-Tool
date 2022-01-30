const mongoose = require("mongoose");
const { find } = require("./models/counselor");
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
//      Counselor.find(parseQuery(query))
Counselor.aggregate([
  {
    "$project": {
      price: {
        "$cond": {
          "if": {
            "$eq": [
              "$price",
              0
            ]
          },
          "then": {
            "$cond": {
              "if": {"$eq": [parseQuery(query)['in_person'], true]},   //IF CLIENT WANTS IN-PERSON APPOINTMENT
              "then": {"$cond": {"if": "$in_person_price", "then": "$in_person_price", "else": "$price"}},
              "else": {"$cond": {"if": "$virtual_price", "then": "$virtual_price", "else": "$price"}}
            }
          },
          "else": "$price"
        }
      },
      name: "$name",
      credentials: "$credentials",
      introduction: "$introduction",
      pfp: "$pfp",
      specializationDesc: "$specializationDesc",
      approachDesc: "$approachDesc",
      age: "$age",
      approach: "$approach",
      gender: "$gender",
      issues: "$issues",
      insurance: "$insurance",
      ethnicity: "$ethnicity",
      specializations: "$specializations",
      pronouns: "$pronouns",
      title: "$title",
      id: "$id",
      in_person: "$in_person", 
      roles: "$roles",
      province: "$province",
      city: "$city",
      janeId: "$janeId",
    },

    
  },
  {
    $match: 
      parseQuery(query)
      //{'$or': [ { age: {'$gte': 65, '$lte': 1000} } ]}
  }
])



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

      //Counselor.find(parseQuery(query))
      Counselor.aggregate([
        {
          "$project": {
            price: {
              "$cond": {
                "if": {
                  "$eq": [
                    "$price",
                    0
                  ]
                },
                "then": {
                  "$cond": {
                    "if": {"$eq": [parseQuery(query)['in_person'], true]},   //IF CLIENT WANTS IN-PERSON APPOINTMENT
                    "then": {"$cond": {"if": "$in_person_price", "then": "$in_person_price", "else": "$price"}},
                    "else": {"$cond": {"if": "$virtual_price", "then": "$virtual_price", "else": "$price"}}
                  }
                },
                "else": "$price"
              }
            },
            name: "$name",
            credentials: "$credentials",
            introduction: "$introduction",
            pfp: "$pfp",
            specializationDesc: "$specializationDesc",
            approachDesc: "$approachDesc",
            age: "$age",
            approach: "$approach",
            gender: "$gender",
            issues: "$issues",
            insurance: "$insurance",
            ethnicity: "$ethnicity",
            specializations: "$specializations",
            pronouns: "$pronouns",
            title: "$title",  
            id: "$id", 
            in_person: "$in_person",   
            roles: "$roles",
            province: "$province",
            city: "$city",
            janeId: "$janeId",
          },

          
        },
        {
          $match: 
            parseQuery(query)
            //{in_person: true}
        }
      ])
      
        .sort({ price: 1, name: 1 }) // <--- TODO: implement logic to dynamically sort, instead of just sorting by price.
                   //note that sort=1 means data will go from lowest to highest.

        .skip(options.skip)
        .limit(options.limit)

        .then((counselorData) => {

          //console.log({counselorData})
          resolve(counselorData);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  function parseQuery(query) {
    console.log(query);
    let parsedQuery = {};
    var ageQueryArray = [];

    for (const [key, value] of Object.entries(query)) {
      if (key === "price") { 
        parsedQuery[key] = { $lte: parseInt(value) };
      } else if (key === "age") {
        //creates an "or" query to select age ranges given by the user's preference
        var ageArray = query["age"].split(",");
        for (let i = 0; i < ageArray.length; i += 2) {
          let newAgeQuery = {};
          let biggerAgeQuery = {};
          newAgeQuery["$gte"] = parseInt(ageArray[i]);
          newAgeQuery["$lte"] = parseInt(ageArray[i + 1]);
          biggerAgeQuery["age"] = newAgeQuery;
          ageQueryArray.push(biggerAgeQuery);
        }
        parsedQuery["$or"] = ageQueryArray;
      // } else if (key === "issues") {
      //   parsedQuery[key] = value.includes(",") ? { $in: value.replace(/_/g, ' ').split(",") } : value.replace(/_/g, ' ');
      } else parsedQuery[key] = value.includes(",") ? { $in: value.split(",") } : value;
    }

    if (parsedQuery['page']) {
      delete parsedQuery['page'];
    }

    if (parsedQuery['per_page']) {
      delete parsedQuery['per_page'];
    }

    if (parsedQuery['issues']) {
      parsedQuery['specializations'] = parsedQuery['issues'];
      delete parsedQuery['issues'];
    }
    if (parsedQuery['in_person']) {
      if (parsedQuery['in_person'] == 'true')
        parsedQuery['in_person'] = true;
    }
    console.log(parsedQuery);
    return parsedQuery;
  }

};