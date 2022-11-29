import { Fragment, useEffect, useState } from "react";
import Header from "../ui/Header";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import MaticStone from "../../utils/MaticStone.json";

const Tutorial = () => {
  const [userAddress, setUserAddress] = useState("");

  const [contract, setContract] = useState();
  // @ts-ignore
  let provider = window.ethereum;

  useEffect(() => {
    if (provider) {
      console.log("MetaMask detected!");
      const web3 = new Web3(provider);
      // const networkId = await web3.eth.net.getId();
      provider.on("accountsChanged", () => {
        window.location.reload();
      });
      setContract(
        new web3.eth.Contract(
          MaticStone.abi,
          "0x212c2E0A66E3a28D9D37D18a390883bEe2c783E6"
        )
      );
      provider
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          // Return the address of the wallet
          console.log(res);
          setUserAddress(res[0]);
        })
        .catch((e) => console.log(e));
    } else {
      alert("Install metamask extension!");
      let meta_url = "https://metamask.io/";
      window.open(meta_url, "_blank") || window.location.replace(meta_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userAddress !== "" && contract !== undefined) {
      // @ts-ignore
      contract.methods
        .balanceOf(userAddress)
        .call({ from: userAddress })
        .then((res) => console.log(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

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
          width="60%"
          height="60%"
          src="https://www.youtube.com/embed/8qD8iVaJOzk"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  );
};

export default Tutorial;
