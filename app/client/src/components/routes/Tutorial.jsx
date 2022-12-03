import { Fragment, useEffect, useState } from "react";
import Header from "../ui/Header";
// @ts-ignore

/**
 * Tutorial component to display the tutorial page.
 * @returns JSX react component element
 */
const Tutorial = () => {
  const [userAddress, setUserAddress] = useState("");

  // @ts-ignore
  let provider = window.ethereum;

  /**
   * Use effect to check if MetaMask is installed,
   * set user address and contract state.
   */
  useEffect(() => {
    if (provider) {
      console.log("MetaMask detected!");
      provider.on("accountsChanged", () => {
        window.location.reload();
      });
      provider
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          setUserAddress(res[0]);
        })
        .catch((e) => console.log(e));
    } else {
      alert("Install MetaMask extension!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="row-lm backdrop">
        <Header address={userAddress} />
        <h1 className="p-5">
          <a className="ah1" href="https://faucetlink.to/goerli">
            FAUCET<span style={{ color: "#3d69d4" }}>LINK</span>
          </a>
        </h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QKHSgmhsjwQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
};

export default Tutorial;
