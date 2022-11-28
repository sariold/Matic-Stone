import { Fragment } from "react";

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar bg-success">
        <div className="container-fluid">
          <div className="home">
            <a className="navbar-brand" href={process.env.REACT_APP_HOMEPAGE}>
              MATIC Stone
            </a>
          </div>
          <div className="navbar-brand">©2022</div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
