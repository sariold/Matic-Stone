import React, { Fragment } from "react";

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg shadow-lg bg-secondary">
        <div className="container-fluid">
          <p className="navbar-brand">Matic Stone</p>
          <div className="navbar-nav">
          <div className="nav-item">
            <p className="nav-link" >
              How-To
            </p>
          </div>
        </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
