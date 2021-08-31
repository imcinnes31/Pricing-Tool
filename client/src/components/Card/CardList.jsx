import React, { Fragment } from "react";
import { SKIP } from "../../constants/skip";

import UserCard from "./UserCard";

export default function CardList({ data, page, setPage, perPage, setPerPage }) {
  return (
    <Fragment>
      <div className="card-list pb-5 mb-5">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {/*////////////////// View more button /////////////////*/}
        {data?.total > perPage ? (
          <a
            className="glossary-button text-muted px-5"
            style={{ float: "right" }}
            onClick={() => {
              setPerPage(perPage + SKIP);
            }}
          >
            view more
          </a>
        ) : (
          <a className="text-muted px-5" style={{ float: "right" }}>
            You've reached the end
          </a>
        )}
      </div>
    </Fragment>
  );
}
