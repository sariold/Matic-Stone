import { Fragment, useEffect, useState } from "react";

const Header = ({ address }) => {
  const [userAddress, setAddress] = useState("");

  useEffect(() => {
    setAddress(address);
  }, [address]);

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  return (
    <Fragment>
      <nav className="navbar bg-success">
        <div className="container-fluid">
          <div className="col text-start home">
            <a className="navbar-brand" href={process.env.REACT_APP_HOMEPAGE}>
              Matic Stone
            </a>
          </div>
          <div className="col text-center">
            <a
              className="navbar-brand"
              href={"https://goerli.etherscan.io/address/" + userAddress}
            >
              [{userAddress}]
            </a>
          </div>
          <div className="col text-end">
            <a className="navbar-brand" href={"https://github.com/sariold"}>
              {date}
            </a>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
