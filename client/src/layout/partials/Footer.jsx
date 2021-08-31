import React from "react";

export default function Footer({ children }) {
  return (
    <footer
      //   className="position-absolute bottom-0 w-100 m-auto"
      className="footer position-fixed bottom-0 w-100 m-auto border-top"
    >
      <div id="footer-inner" className="container py-1 text-black">
        <div className="row w-100">
          <div className="col-6 text-start">
            <small className="text-muted">{children}</small>
          </div>
          <div className="col-6 text-end">
            <small className="text-muted">linkedIn</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
