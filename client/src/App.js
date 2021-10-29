import React, { Children, Fragment, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./assets/css/App.css";
import { FILTERS } from "./constants/filters";
import { ROUTES } from "./constants/routes";
import DefaultLayout from "./layout/DefaultLayout";
import {
  About,
  Contact,
  Faq,
  History,
  Main,
  Information,
  Home,
  Admin,
  RegisterUser,
  Login,
  UserList,
} from "./pages";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import { AuthContext } from "./context/auth-context";
import { Container } from "react-bootstrap";

const company = {
  name: "Phare",
  address: "1234 Westbrook Mall",
};

export default function App(props) {
  const [filters, setFilters] = React.useState(FILTERS);

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false); //delete false here?
  const [role, setRole] = useState();

  const login = useCallback((uid, token, role) => {
    setToken(true);
    setUserId(uid);
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setUserId(null);
    setRole(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>

        {/* need exact so that the router doesn't try to take a shortened url */}
        <Route exact path={ROUTES.MAIN}>
          <Main filters={filters}>{props.children}</Main>
        </Route>

        <Route exact path={ROUTES.INFO}>
          <Information />
        </Route>

        <Route exact path={ROUTES.HISTORY}>
          <History />
        </Route>

        <Route exact path={ROUTES.FAQ}>
          <Faq />
        </Route>

        <Route exact path={ROUTES.CONTACT}>
          <Contact />
        </Route>

        <Route exact path={ROUTES.ABOUT}>
          <About />
        </Route>
        <Route
          exact
          path={`${ROUTES.PROFILE}/:userid`}
          render={() => <ProfilePage />}
        />
        {role === "Admin" || role === "Counselor" ? (
          <Route exact path={ROUTES.ADMIN}>
            <Admin />
          </Route>
        ) : (
          ""
        )}
        {role === "Admin" ? (
          <Route exact path={ROUTES.USERLIST}>
            <UserList />
          </Route>
        ) : (
          ""
        )}
        {/* <Route exact path="/*">
          <NotFound />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>

        {/* need exact so that the router doesn't try to take a shortened url */}
        <Route exact path={ROUTES.MAIN}>
          <Main filters={filters}>{props.children}</Main>
        </Route>

        <Route exact path={ROUTES.INFO}>
          <Information />
        </Route>

        <Route exact path={ROUTES.HISTORY}>
          <History />
        </Route>

        <Route exact path={ROUTES.FAQ}>
          <Faq />
        </Route>

        <Route exact path={ROUTES.CONTACT}>
          <Contact />
        </Route>

        <Route exact path={ROUTES.ABOUT}>
          <About />
        </Route>
        <Route exact path={ROUTES.REGISTERUSER}>
          <RegisterUser />
        </Route>

        <Route exact path={ROUTES.Login}>
          <Login />
        </Route>
        {/* <Route exact path="/*">
          <NotFound />
        </Route> */}
        <Redirect to="/login" />
      </Switch>
    );
  }
  /**
   * Default layout countrols how the page is devided into sections for page components
   * such as the header, footer, and main page.
   */

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <DefaultLayout company={company}>
          {/* Switch is to switch between pages */}

          {/* <Switch>
            <Route exact path={ROUTES.HOME}>
              <Home />
            </Route> */}

          {/* need exact so that the router doesn't try to take a shortened url */}
          {/* <Route exact path={ROUTES.MAIN}>
              <Main filters={filters}>{props.children}</Main>
            </Route>

            <Route exact path={ROUTES.INFO}>
              <Information />
            </Route>

            <Route exact path={ROUTES.HISTORY}>
              <History />
            </Route>

            <Route exact path={ROUTES.FAQ}>
              <Faq />
            </Route>

            <Route exact path={ROUTES.CONTACT}>
              <Contact />
            </Route>

            <Route exact path={ROUTES.ABOUT}>
              <About />
            </Route> */}

          {/* <Route
              exact
              path={`${ROUTES.PROFILE}/:userid`}
              render={() => <ProfilePage />}
            />

            <Route exact path={ROUTES.ADMIN}>
              <Admin />
            </Route> */}

          {/* <Route exact path={ROUTES.REGISTERUSER}>
              <RegisterUser />
            </Route>

            <Route exact path={ROUTES.Login}>
              <Login />
            </Route> */}
          <main>{routes}</main>
          {/* <Route exact path="/*">
            <NotFound />
          </Route> */}
          {/* </Switch> */}
        </DefaultLayout>
      </Router>
    </AuthContext.Provider>
  );
}
