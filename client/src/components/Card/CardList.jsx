import React, { Fragment } from "react";
import { SKIP } from "../../constants/skip";
import { useLocation } from "react-router-dom";
import UserCard from "./UserCard";

export default function CardList({ data, page, setPage, perPage, setPerPage, query, scrollPosition, roleVal, currentProfile, setCurrentProfile }) {

    const location = useLocation();

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

  React.useEffect(() => {
    if (location.scrollPosition) {
      // console.log("scrolling");
      window.scrollTo({
        top: location.scrollPosition,
        left: 0,
      });
      location.scrollPosition = null;
    }
    else {
      // console.log("not scrolling");
    }
  }, []);

  return (

    <Fragment>
      <div className="card-list pb-5 mb-5">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} query={query} perPage={perPage} roleVal={roleVal} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} />
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
