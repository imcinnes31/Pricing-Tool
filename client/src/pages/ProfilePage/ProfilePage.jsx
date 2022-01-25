import React, { Fragment } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useHttpRequest from "../../hooks/HttpRequest";
import { Spinner } from "../../components/Spinner";
import UserSummary from "./UserSummary";
import ProfilePanel from "./ProfilePanel";
import { ROUTES } from "../../constants/routes";

export default function ProfilePage() {
  const { userid } = useParams();
  const { loading, error, data } = useHttpRequest(
    `http://localhost:5000/api/v2/counselors/id/${userid}`
  ); // data in this context is a user object.
  const location = useLocation();

  // console.log("Scroll passed to profile page: " + location.scrollPosition)
  // console.log("Query passed to profile page: " + location.query);
  // console.log("Perpage passed to profile page: " + location.perPage);

  if (loading) return <Spinner />;
  if (error) return "Something went wrong. Please try again.";
  if (data) {
    return (
      <Fragment>
        <div>
          {/* use history instead of static route */}
          <Link className='glossary-button' to={{pathname: ROUTES.MAIN, query: location.query, perPage: location.perPage, scrollPosition: location.scrollPosition}}>
            Go Back
            {/* <button className="btn secondary-button"> </button> */}
          </Link>
        </div>
        <hr />

        {/* <div> */}
        <div className="container row align-items-start">

          <div className="col-5">
            <ProfilePanel user={data} loading={loading} />
          </div>

          <div className="col-7 my-2">
            <UserSummary user={data} />
          </div>

        </div>

        <div className="container py-5"></div>
        {/* </div> */}
      </Fragment>
    );
  } else {
    return null;
  }
}
