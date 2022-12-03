import { Fragment, useEffect, useState } from "react";

/**
 * Header component to display the header of the page and
 * information about the user.
 * @param {object} props - User address information
 * @returns JSX react component element
 */
const Header = ({ address }) => {
  const [userAddress, setAddress] = useState("");
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  var metaMask = "https://metamask.io/";
  var etherScan = "https://goerli.etherscan.io/address/" + userAddress;

  /**
   * Use effect to set address state.
   */
  useEffect(() => {
    setAddress(address);
  }, [address]);

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
              href={userAddress ? etherScan : metaMask}
            >
              {userAddress ? (
                userAddress
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  alt="MetaMask"
                  className="metamask-logo"
                />
              )}
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
