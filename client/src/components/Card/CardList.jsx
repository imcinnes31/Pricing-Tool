import React, { Fragment } from "react";
import { SKIP } from "../../constants/skip";

import UserCard from "./UserCard";

export default function CardList({ data, page, setPage, perPage, setPerPage }) {

    const handleScroll = () => {

      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

      if (bottom) {
        if (data.total > perPage) {
          setPerPage(perPage + SKIP);
        }
      }
    };

    React.useEffect(() => {
      window.addEventListener('scroll', handleScroll, {
        passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <Fragment>
      <div className="card-list pb-5 mb-5">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {/*////////////////// View more button /////////////////*/}
        {data?.total > perPage ? (
          <div>
          <a
            className="glossary-button text-muted px-5"
            style={{ float: "right" }}
            onClick={() => {
              setPerPage(perPage + SKIP);
            }}
          >
            scroll to view more

            {[...Array(20)].map((e, i) => <br></br>)}
            
          </a>
          </div>
        ) : (
          <a className="text-muted px-5" style={{ float: "right" }}>
            You've reached the end
          </a>
        )}
      </div>
    </Fragment>
  );
}
