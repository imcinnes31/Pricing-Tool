import React, { Fragment } from "react";
import '../../assets/css/Profile.css'
import { Spinner } from "../../components/Spinner";

export default function ProfilePanel({ user, loading }) {
  return (
    <Fragment>
      <div className='pfp-container' style={{ borderColor:'red' , height: '300px'}}>
        {/* use this when the pfp container is fixed */}
        {loading ? <Spinner/> : <img className="mx-auto d-block" src={user.pfp.startsWith("uploads/") ? `http://localhost:5000/${user.pfp}` : user.pfp} style={{maxWidth:'400px', maxHeight:'325px'}} />}
	    {/* loading ? <Spinner /> : <img className="py-3" src={`${user.pfp}`} /> */}
      </div>
      <div className="row">
        <hr className="mt-4" style={{ width: "87%" }} />
        <div className="mb-3">
          <h6 className="col-8 px-3">
            {/* Going to change this to a pill later... */}
            <strong>Cost per session: </strong>${user.price}
          </h6>
        </div>

        <div className="button_container">
          <button className="btn primary-button py-2">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </Fragment>
  );
}
