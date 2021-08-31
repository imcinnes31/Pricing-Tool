// routes/router.name.js
/**/
const { DB } = require("../database");
// Displaying 0 - 0 of 8988
module.exports = (server) => {
  const dataTable = "counselors";

  server.get("/api/v1/counselors", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

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
    // const total = await DB.countDocuments(dataTable);
    // const totalPages = Math.ceil(total / limit);

    let p = DB.find(
      dataTable,
      req.query, // query empty object returns all records/documents.   You can pass filter options in this query to get the source.
      {
        sort: { date: -1 },
        skip: limit * (currentPage - 1),
        limit: limit,
        order: sorting,
        key: "price",
      }
    );

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
  })

  server.get("/api/v1/counselors/:id", async (req, res) => {

    // use find() to pull the user object
    let p = DB.find(dataTable, {id: req.params.id}, undefined)

    p.then((result) => {
      res.status(200).json(result.data[0])
    }).catch((err) => {
      res.status(400).json({
        msg: "error reading from db",
        total: 0,
        total_pages: 0,
        current_page: 0,
        data: [],
      })
    })
  });
};
