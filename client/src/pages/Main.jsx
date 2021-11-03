import React, { Fragment } from "react";
import FilterContainer from "../components/FilterContainer";
import useHttpRequest from "../hooks/HttpRequest";
import { Spinner } from "../components/Spinner";
import CardList from "../components/Card/CardList";
import { SKIP } from "../constants/skip";

const ajaxUrl = process.env.REACT_APP_BACKEND_URL + "/v2/counselors";

export default function Main({ filters }) {
  const [isSelected, setIsSelected] = React.useState([]);
  const [query, setQuery] = React.useState(""); // represents everything after the ? in a query. ex: api/counselor? ${query}
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(SKIP);
  const { loading, error, data } = useHttpRequest(
    `${ajaxUrl}?${query}&page=${page}&per_page=${perPage}&`
  );

  React.useEffect(() => {
    setPerPage(SKIP);
  }, [query]);

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
        />
      )}
    </Fragment>
  );
}
