


import React, { Fragment } from "react";

export default function Query({ isSelected, setQuery, sliderVal, provVal, cityVal, inPersonVal, roleVal }) {
  // Logic for building the query string and setting query
  function buildQuery() {
    let arrayAfterSplit = [];

    // (1) split the strings to identify the category
    isSelected.forEach((q) => {
      arrayAfterSplit.push(q.split("="));
    });

    // (2) create objects before building the query
    let category = {};
    arrayAfterSplit.forEach((pair) => {
      const key = pair[0];
      const val = pair[1];

      //IAN'S AGE FILTER CODE
      var minAge;
      var maxAge;
      if (key === "age") {
        if (val.split("_")[0] === "adults") {
          minAge = 20;
          maxAge = 64;
        } else if (val.split("_")[0] === "elders") {
          minAge = 65;
          maxAge = 1000;
        } else {
          var ageQuerySplit = val.split("(")[1].split(")")[0];
          minAge = ageQuerySplit.split("_")[0];
          maxAge = ageQuerySplit.split("_")[2];
        }
      }

      //if age buttons are selected, create the age query as a number array
      if (key === 'age') {
        if (category[key]) {
          const temp = category[key];
          category[key] = temp.concat("," + minAge + "," + maxAge);
        } else {
          const temp = key.concat("=", minAge + "," + maxAge);
          category[key] = temp;
        }
         }
      else {
        if (category[key]) {
          const temp = category[key];
          category[key] = temp.concat("," + val);
        } else {
          const temp = key.concat("=", val);
          category[key] = temp;
        }
      }

    });

    // (3) append individual query arguments into a string
    let query = "";
    for (const v of Object.values(category)) {
      query === "" ? (query = query.concat(v)) : (query = query.concat("&", v));
    }

    // Hacky way to apply slider bar filter when button is clicked.
    query === ""
      ? (query = query.concat("price=", sliderVal)) //    price=1    &heigh=10&colors=blue,red
      : (query = query.concat("&price=", sliderVal));

    if (inPersonVal == true) {
      query = query.concat("&in_person=true");
      query = query.concat("&province=", provVal.toLowerCase().replaceAll(' ','_'));
      //query = query.concat("&province=", provVal);
      query = query.concat("&city=", cityVal.toLowerCase().replaceAll(' ','_'));
      //query = query.concat("&city=", cityVal);
    }

    query=query.concat("&roles=",roleVal.toLowerCase());

    // console.log({query})
    setQuery(query);
  }

  return (
    // This HTML represents the purple apply filters button on the Main page
    <Fragment>
      <div className="row mt-5">
        <div className="col-4 w-100 h-100 text-center">
          <button
            className="btn primary-button px-4 py-2"
            onClick={() => buildQuery()}
          >
            <div>Apply Filters</div>
          </button>
        </div>
      </div>
    </Fragment>
  );
}