import React, { Fragment } from "react";

export default function UserSummary({ user }) {
  return (
    <Fragment>
      <h1>{user.name}</h1>
      <h4 className="glossary-button">{user.credentials}</h4>
      <h6 className="profile-pronouns">{user.pronouns}</h6>

      <hr className="mt-4" />

      <div className="pt-2 pb-3">
        <div className="pt-2 pb-3">
          <h4 className="pt-2 pb-3">Introduction</h4>
          <p>{user.description}</p>
        </div>

        <div className="py-3">
          <h4 className="py-3">Treatment Areas</h4>
          <p>{user.specializationDesc}</p>
        </div>

        <div className="py-3">
          <h4 className="py-3">Therapy Approach</h4>
          <p>{user.approachDesc}</p>
        </div>

      </div>
    </Fragment>
  );
}
