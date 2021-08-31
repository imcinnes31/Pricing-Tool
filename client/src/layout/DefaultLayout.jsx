import React from "react";
import { Footer, Header, Hero, Main } from "./partials";
import { Fragment } from "react";

export default function DefaultLayout({company, children }) {
  return (
    // page-layout is just a markup
    <div className="page-layout">
      <Header company={company} other={"other"}/>
      <Hero />
      <Main>{children}</Main>
      <Footer>
        &copy; {new Date().getFullYear().toString()} {company?.name}
      </Footer>
    </div>
  );
}
