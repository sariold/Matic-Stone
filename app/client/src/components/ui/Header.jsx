import { Fragment } from "react";

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <p className="navbar-brand">MATIC STONE</p>
          <div className="navbar-nav">©2022</div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
