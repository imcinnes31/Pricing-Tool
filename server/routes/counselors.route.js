// routes/router.name.js
/**/
const express = require("express");
const { DB, Mongo } = require("../database");
const counselor = require("../database/models/counselor");
// Displaying 0 - 0 of 8988
const counselorControllers = require("../database/controllers/counselor-controllers");
const router = express.Router();
const locationFunctions = require("../utils/locations");
const fileUpload = require('../middleware/file-upload');

const DEFAULT_LIMIT = 4;
const DEFAULT_PAGE = 1;
const DEFAULT_ORDER = "desc";

module.exports = (server) => {
  /**
   * This server has 4 total routes.
   *
   * The React app SHOULD be using v2 api calls.
   *
   * ROUTE: /api/v2/counselors
   * This route is used for sorting and filtering data from the database. This is version 2
   * of the query route. It uses MONGO-DB to sort and filter the data that is stored in MONGO-db Atlas.
   *
   * ROUTE: /api/v2/counselors/id/:id
   * This route is used for targetting a specific user. It is currently being used to access user data
   * for displaying info on their profile page.
   *
   * ROUTE: /api/v1/counselors
   * This is version 1 of the query route. It did not use MONGO-DB. This version uses a static json data
   * file which is stored in /database/data/data.json
   *
   * ROUTE: /api/v1/counselors/:id
   * This is version 1 of the id targetting URL for profile pages. Does not use MONGO-DB.
   */

  const dataTable = "counselors";

  server.get("/api/v2/counselors", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const sorting = req.query.sorting ? req.query.sorting : DEFAULT_ORDER; // 'asc'

    const currentPage = req.query.page
      ? +req.query.page < 0
        ? +req.query.page * -1
        : +req.query.page
      : DEFAULT_PAGE;

    const limit = req.query.per_page
      ? +req.query.per_page < 0
        ? +req.query.per_page * -1
        : +req.query.per_page
      : DEFAULT_LIMIT;

    // Use Mongo object to interact with the Mongo-DB.

    let count = await Mongo.countDocuments(req.query, {
      sort: 1,
      limit: limit,
      skip: limit * (currentPage - 1),
    });

    let data = await Mongo.find(req.query, {
      sort: 1,
      limit: limit,
      skip: limit * (currentPage - 1),
    });

    res.status(200).json({
      total: count.total,
      total_pages: count.totalPages,
      current_page: currentPage,
      data: data,
    });

  });

  server.get("/api/v2/counselors/id/:id", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    // use find() to pull the user object
    Mongo.find(
      { id: req.params.id },
      {
        sort: 1,
        limit: 1,
        skip: 0,
      }
    )
      .then((result) => {
        res.status(200).json(result[0]);
      })
      .catch((err) => {
        res.status(400).json({ err }); //   TODO: error handling
      });


  });

  server.get("/api/v2/counselors/meta-data", async (req, res) => {
    /**
     * This route should return the max and min price of the database.
     */
    res.set("Access-Control-Allow-Origin", "*");

  
    let count = await Mongo.countDocuments("", {
      sort: 0,
      limit: 0,
      skip: 0,
    });
    counselor.countDocuments("");

    // console.log({count})

    // console.log({count})

    res.status(200).json({
      total: count.total,
      max_price: count.maxPrice,
      min_price: count.minPrice
    });


  });

  //handles adding new counselors in the admin page
  server.post('/api/insertCounselor', 
    fileUpload.single('pfp'),
    //form data checker
    counselorControllers.insertCounselor
  );

  // get dictionary of provinces and cities available from counselor database
  server.get('/api/v2/counselors/locations', async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
 
    let locations = [];
    let provinces = await counselor.distinct("province", { in_person: true });

    for (const province of provinces) {
      let currentProvince = {};
      let cities = await counselor.distinct("city", {in_person: true, province: province});
      let provinceName = province;
      provinceName = provinceName.replace(/_/g," ").toLowerCase().split(" ");
      for (var i = 0; i < provinceName.length; i++) {
          provinceName[i] = provinceName[i].charAt(0).toUpperCase() + provinceName[i].substring(1);     
      }
      provinceName = provinceName.join(" ");
      currentProvince["category"] = provinceName;
      let cityNames = [];
      cities.forEach((cityName, index) => {
        cityName = cityName.replace(/_/g," ").toLowerCase().split(" ");
        for (var i = 0; i < cityName.length; i++) {
          cityName[i] = cityName[i].charAt(0).toUpperCase() + cityName[i].substring(1);     
        }
        cityName = cityName.join(" ");
        cityName = cityName.split("-");
        for (var i = 0; i < cityName.length; i++) {
          cityName[i] = cityName[i].charAt(0).toUpperCase() + cityName[i].substring(1);     
        }
        cityName = cityName.join("-");
        cityNames.push(cityName)
      });
      currentProvince["list"] = cityNames;
      locations.push(currentProvince);
    }

    res.status(200).json({
      locations: locations
    });
  });

 

///////////////////////////////////// OLD /////////////////////////////////////////////////////////////////

  server.get("/api/v1/counselors", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*"); // This tells cors to allow requests from any IP address

    // ?sorting=asc,desc
    const sorting = req.query.sorting ? req.query.sorting : "desc"; // 'asc'

    const currentPage = req.query.page
      ? +req.query.page < 0
        ? +req.query.page * -1
        : +req.query.page
      : 1;

    const limit = req.query.per_page
      ? +req.query.per_page < 0
        ? +req.query.per_page * -1
        : +req.query.per_page
      : 9;

    /**
     * Query: Filters checkboxes
     */
    // DB is an object that you can use to access the "Mock" database
    let p = DB.find(
      dataTable,
      req.query, // query empty object returns all records/documents.   You can pass filter options in this query to get the source.
      {
        sort: { date: -1 },
        skip: limit * (currentPage - 1), // page
        limit: limit, // how many results per page
        order: sorting, // order is ascending / descending
        key: "price", // Object property to sort by
      }
    );

    // console.log("QUERY:", req.query);

    p.then((result) => {
      res.status(200).json({
        msg: "ok",
        total: result.total,
        total_pages: result.totalPages,
        current_page: currentPage,
        data: result.data,
      });
    }).catch((err) => {
      res.status(400).json({
        msg: "error reading from db",
        total: 0,
        total_pages: 0,
        current_page: 0,
        data: [],
      });
    });
  });

  server.get("/api/v1/counselors/:id", async (req, res) => {
    // use find() to pull the user object
    let p = DB.find(dataTable, { id: req.params.id }, undefined);

    p.then((result) => {
      res.status(200).json(result.data[0]);
    }).catch((err) => {
      res.status(400).json({
        msg: "error reading from db",
        total: 0,
        total_pages: 0,
        current_page: 0,
        data: [],
      });
    });
  });
};
