import React from "react";
import { Footer, Header, Main } from "./partials";

export default function DefaultLayout({ company, children }) {
  return (
    // page-layout is just a markup
    <div className="page-layout">
      <Header company={company} other={"other"}/>
      <Main>{children}</Main>
      <Footer>
        &copy; {new Date().getFullYear().toString()} {company?.name}
      </Footer>
    </div>
  );
}
