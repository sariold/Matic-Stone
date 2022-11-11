import { Fragment, useEffect, useState } from "react";
import Button from "../ui/Button";
import Header from "../ui/Header";

const Home = () => {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      // Do something
    } else {
      alert("Install metamask extension!!");
    }
  }, []);

  const connectMetaMask = async () => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      // Return the address of the wallet
      console.log(res);
      setUserAddress(res);
    });
  };

  return (
    <Fragment>
      <div>
        <Header />
        <div
          className="background text-center"
          style={{ backgroundImage: "url(/assets/Background.jpg)" }}
        >
          <div className="row-lm">
            <button
              className={
                userAddress ? "btn btn-primary m-4" : "btn btn-danger m-4"
              }
              onClick={connectMetaMask}
            >
              MetaMask
            </button>
          </div>
          <div className="row-lm">
            <button
              style={{ pointerEvents: userAddress ? "" : "none" }}
              className={
                userAddress ? "btn btn-primary m-4" : "btn btn-danger m-4"
              }
            >
              Mint Cards
            </button>
          </div>
          <div className="row-lm">
            <Button
              className={
                userAddress ? "btn btn-primary m-4" : "btn btn-danger m-4"
              }
              style={{ pointerEvents: userAddress ? "" : "none" }}
              text={"Play Game!"}
              path={"/game"}
            />
          </div>
          <div className="row-lm">
            <Button
              className={"btn-primary m-4"}
              text={"Tutorial!"}
              path={"/"}
            />
          </div>
          <div className="row-lm">
            <Button
              className={"btn-primary m-4"}
              text={"Card Carousel!"}
              path={"/"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
