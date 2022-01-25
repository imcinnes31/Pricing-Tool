import React, { Fragment } from "react";
import FilterContainer from "../components/FilterContainer";
import useHttpRequest from "../hooks/HttpRequest";
import { Spinner } from "../components/Spinner";
import CardList from "../components/Card/CardList";
import { SKIP } from "../constants/skip";
import { useLocation } from "react-router-dom";

const ajaxUrl = process.env.REACT_APP_BACKEND_API + "/v2/counselors";

export default function Main({ filters }) {
  const [isSelected, setIsSelected] = React.useState([]);
  const [query, setQuery] = React.useState(""); // represents everything after the ? in a query. ex: api/counselor? ${query}
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(SKIP);
  const location = useLocation();
  // put loading, error data back here if doesn't work

  var scrollPosition = null;
  React.useEffect(() => {
    if(location.perPage) {
      setPerPage(location.perPage);
      location.perPage = null;
    }
    else {
      setPerPage(SKIP);
    }
    if(location.query) {
      setQuery(location.query);
      location.query = null;
    }
    else {
      setQuery(query);
    }
    console.log("Perpage passed to main: " + perPage);
    console.log("Query passed to main: " + query);
  }, [query]);

  const { loading, error, data } = useHttpRequest(
    `${ajaxUrl}?${location.query ? location.query : query}&page=${page}&per_page=${location.perPage ? location.perPage : perPage}&`
  );


  return (
    <Fragment>
      <div className="row">
        <h1>
          Find a <span style={{ color: "var(--secondary_1)" }}>counselor.</span>
        </h1>
      </div>

      <FilterContainer
        filters={filters}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        setQuery={setQuery}
      />

      <div className="row mt-5 border-top pt-5">
        <div style={{ marginBottom: "10px" }}>
          <small className="text-muted">
            {data && <label>{data.total} counselors available</label>}
          </small>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <CardList
          data={data}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          query={query}
          scrollPosition={scrollPosition}
        />
      )}
    </Fragment>
  );
}
