import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function UserCard({ user }) {
  function trimParagraph(paragraph) {
    const maxLength = 275;
    return paragraph.length > maxLength
      ? paragraph.slice(0, maxLength) + "..."
      : paragraph;
  }

  return (
    <div className="card mb-3 offWhite">
      <div className="row g-0">
        <div className="col-md-4">
          {/* src={require("./assets/logo.jpg").default} */}
          <img
            // src={require(`../assets/images/profiles/${user.pfp}`).default}
            src={user.pfp.startsWith("uploads/") ? `http://localhost:5000/${user.pfp}` : `https://picsum.photos/360/240?random=${Math.floor(Math.random() * 100)}`}
            className="mx-auto d-block img-fluid rounded-start"
            alt={user.name}
            style={{ height: "100%", maxHeight: "325px"}}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: 700 }}>
              {user.name}
            </h5>
            <div
              className="b-2"
              style={{ fontWeight: 500, marginBottom: "3px" }}
            >
              {user.credentials.map((c, i) => (
                <span key={c}>
                  {i < user.credentials.length - 1 ? `${c}, ` : `${c}`}
                </span>
              ))}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <small className="text-muted">{user.pronouns}</small>
            </div>
            <p className="card-text"> {trimParagraph(user.introduction)} </p>
            <p>Cost per session: ${user.price}</p>
            <p className="">
              <Link to={`${ROUTES.PROFILE}/${user.id}`}>
                <button className="btn secondary-button">VIEW PROFILE</button>
              </Link>           

              <button className="btn primary-button">
                BOOK AN APPOINTMENT
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
{
  
  const cardtem = {}
  const cardH3 = {
    fontSize: '18px',
    fontWeight: 500,
    color: 'steelblue',
  }
  
  
  return (
    <div className={'card-item'} style={cardtem}>
    <hr/>
    <h3 style={cardH3}>{user?.name}</h3>
    
    {/* <Link to={`/${item.name.toLowerCase().replace(/ /g, "-")}`}> View Profile</Link> }
    
    <Link to={`/profile/${user?.id}`}> View Profile</Link>
    
    {/* <Switch>
      <Route exact path={`/${user?.id}`} component={() => <Profile user={user} />} />
    </Switch> }
    
    
    <p className={'badge bg-info'}>{user?.issues}</p>
    
    </div>
    );
  }
*/
