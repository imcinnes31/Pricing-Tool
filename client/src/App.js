import React, { Children, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/css/App.css";
import { FILTERS } from "./constants/filters";
import { ROUTES } from "./constants/routes";
import DefaultLayout from "./layout/DefaultLayout";
import { About, Contact, Faq, History, Main, Information, Home, Register, RegisterUser } from "./pages";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

const company = {
  name: "Phare",
  address: "1234 Westbrook Mall",
};

export default function App(props) {
  const [filters, setFilters] = React.useState(FILTERS);

  /**
   * Default layout countrols how the page is devided into sections for page components
   * such as the header, footer, and main page.
   */

  return (
    <Router>
      <DefaultLayout company={company}>
        {/* Switch is to switch between pages */}

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

          <Route exact path={ROUTES.REGISTER}>
            <Register/>
          </Route>

          <Route exact path={ROUTES.REGISTERUSER}>
            <RegisterUser/>
          </Route>

          <Route exact path="/*">
            <NotFound />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  );
}
