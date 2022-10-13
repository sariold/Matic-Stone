import React, { Fragment } from "react";

const Footer = (props) => {
  return (
    <Fragment>
      <div className="navbar fixed-bottom shadow-lg bg-secondary">
        <div className="container text-center">
          <div className="col">
            <div className="row">
              <p>Copyright © {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
