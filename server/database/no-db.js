const fs = require("fs");
const { parse } = require("path");
const path = require("path");
const { lowercase, compareDate, compareNum, compareStr } = require("../utils/index");

module.exports = (DB) => { // Syntax to create an object
  // Count how many documents there is in a particular collection
  DB.countDocuments = (collection) => {
    return new Promise((resolve, reject) => {
      // Read the data.json file's content
      fs.readFile(path.join(__dirname + "/data/data.json"), (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data)[collection].length);
      });
    });
  };

  // Find the documents we need
  DB.find = (collection, query, options) => {
    //console.log({query})
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname + "/data/data.json"), (err, data) => {
        if (err) reject(err);
        // store all records in an array


        // The meta-data (total, total_pages, current_page) is calculated and returned from this callback after the data has
        // been retrieved from the database.
        let parsedData = JSON.parse(data)[collection];

        parsedData = filterData(parsedData, query)
        const total = parsedData.length;
        let totalPages = 1;
        
        // Sort data dynamically
        if (options) {
          sortData(parsedData, options.key, options.order); // TODO
          totalPages = Math.ceil(total / options.limit);
          
          // Skip and limit
          parsedData = parsedData.slice(
            options.skip,
            options.skip + options.limit
          );
        }
        //////////////////////////////////////////////

        resolve({
          total: total,
          totalPages: totalPages,
          data: parsedData
        });
      });
    });
  };
};

function filterData(data, query) {
  //////////////////////////////filter version///////////////////////////////
  return data.filter((counselor) => {
    const queryKeys = Object.keys(query);
    let valid = true;

    queryKeys.forEach((queryKey) => {
      const val = counselor[queryKey];
      const type = typeof val;
      const queryVal = query[queryKey];

      // Check the type
      switch (type) {
        case "undefined":
          break;
        case "number":
          if (val !== +queryVal) valid = false;
          break;
        case "string":
          if (lowercase(val) !== lowercase(queryVal)) valid = false;
          break;
        case "object":
          if (Array.isArray(val)) {
            if (queryVal.includes(",")) {
              const words = queryVal.split(",");

              // word represents an individual arguement in a query.  ex: attr=arg0,arg1,arg2   =>  words = [arg0, arg1, arg2]
              words.forEach((word) => {
                if (!lowercase(val).includes(lowercase(word))) valid = false;
              });
            } else if (!lowercase(val).includes(lowercase(queryVal)))
              valid = false;
          }
          break;
      }
    });

    return valid;
  });
  ////////////////////////////////////////////////////////////////////////////
}

// Sorts whatever array you pass through the function.
// This function mutates the Array instead of returning a value.
// You must pass it an array of objects
function sortData(arr, key, order) {
  if (!arr) return;
  if (arr.length == 0) return;
  if (!arr[0][key]) return;

  if (key.toLowerCase() === "date") sortBy(compareDate, arr, key, order);
  else {
    switch (typeof arr[0][key]) {
      case "string":
        sortBy(compareStr, arr, key, order);
        break;

      case "number":
        sortBy(compareNum, arr, key, order);
        break;
    }
  }
}

// 'func' param should return a 1 or -1 depending on if it should come first or last.
function sortBy(func, arr, key, order) {
  arr.sort((a, b) => {
    if (order === "desc") return func(b[key], a[key]);
    else return func(a[key], b[key]);
  });
}
