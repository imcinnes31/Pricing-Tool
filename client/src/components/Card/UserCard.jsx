import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function UserCard({ user, query, perPage, roleVal, currentProfile, setCurrentProfile }) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function trimParagraph(paragraph) {
    const maxLength = 275;
    return paragraph.length > maxLength
      ? paragraph.slice(0, maxLength) + "..."
      : paragraph;
  }

  function toggleProfileOn(event) {
    setCurrentProfile(event.target.id);
  }

  function toggleProfileOff(event) {
    setCurrentProfile("");
  }

  return (
    <div className="card mb-3 offWhite">
      <div className="row g-0 align-items-center">
        <div className="col-md-4 d-block mx-auto" id="counselorPic">
          <img
            // src={require(`../assets/images/profiles/${user.pfp}`).default}
            id="counselorImage"
            src={user.pfp.startsWith("uploads/") ? `http://localhost:5000/${user.pfp}` : user.pfp}
            className="mx-auto d-block img-fluid rounded-start"
            alt={user.name}
          />
        </div>
        <div className="col-md-8" id="counselorInfo">
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: 700 }}>
              {user.name}
            </h5>
            <div
              className="b-2"
              id="counselorCredentials"
              style={{ fontWeight: 500, marginBottom: "3px" }}
            >
              {user.credentials.map((c, i) => (
                <span key={c}>
                  {i < user.credentials.length - 1 ? `${c}, ` : `${c}`}
                </span>
              ))}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <small className="text-muted">{user.pronouns ? user.pronouns : null}</small>
            </div>
            <p className="card-text"> {trimParagraph(user.introduction)} </p>
            <h6>{`Languages: `}
          {user.languages.map((c, i) => (
          <span key={c}> 
          {i < user.languages.length - 1 ? `${c[0].toUpperCase() + c.substring(1)}, ` : `${c[0].toUpperCase() + c.substring(1)}`}
          </span>
          ))}
          </h6>
          {roleVal == "Supervisor" ?
            <p>Supervision rate: ${user.price}</p>          
            :
            <p>Cost per session: ${user.price}</p>
            }
            <p className="buttonContainer">
              {/* <Link to={{pathname: `${ROUTES.PROFILE}/${user.id}`, query: query, perPage: perPage, scrollPosition: scrollPosition, roleVal: roleVal}}>
                <button className="btn secondary-button">VIEW PROFILE</button>
              </Link> */}
              {`profile_${user.id}` == currentProfile ?
                <button className="btn primary-button" id={`profile_${user.id}`} onClick={(event) => toggleProfileOff(event)}>
                  MINIMIZE PROFILE
                </button>
              :
                <button className="btn secondary-button" id={`profile_${user.id}`} onClick={(event) => toggleProfileOn(event)}>
                  VIEW PROFILE
                </button>
              }
              {user.janeId ? 
              <a href={'https://phare.janeapp.com/#/staff_member/' + user.janeId} target="_blank">
              <button className="btn primary-button">
                BOOK A FREE INITIAL CONSULTATION
              </button>
              </a>
              :
              <button className="btn danger-button">
                BOOKING NOT AVAILABLE AT PRESENT
              </button>
              }
            </p>
          </div>
        </div>
      </div>
      {`profile_${user.id}` == currentProfile ?
      <div id="counselorBio" className="border-top border-dark row g-0 align-items-left">

        <div className="col-md-11 md-1 mt-3 d-block mx-auto">         
          <h5 className="py-0">{`An introduction to ${user.name}`}</h5>
          <p>{user.descriptionLong ? user.descriptionLong : user.introduction}</p>
        </div>
        <div className="col-md-11 mt-md-1 d-block mx-auto">         
          <h5 className="py-0">Treatment Areas</h5>
          <p>{user.specializationDesc}</p>
        </div>
        <div className="col-md-11 mt-md-1 d-block mx-auto">         
          <h5 className="py-0">Therapy Approach</h5>
          <p>{user.approachDesc}</p>
        </div>
        <div className="col-md-11">
          <div className="card-body">
          {user.janeId ? 
              <a href={'https://phare.janeapp.com/#/staff_member/' + user.janeId} target="_blank">
              <button className="btn primary-button">
                BOOK A FREE INITIAL CONSULTATION
              </button>
              </a>
              :
              <button className="btn danger-button">
                BOOKING NOT AVAILABLE AT PRESENT
              </button>
              }
          </div>
        </div>
      </div>

      
      : null}
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
