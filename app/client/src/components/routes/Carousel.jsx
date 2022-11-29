import React from "react";
import { Fragment, useEffect, useState } from "react";
import { fetcher } from "../../utils/retriever";
import Loader from "../ui/loader.gif";
import Header from "../ui/Header";
import CarouselCards from "../ui/CarouselCards";
// @ts-ignore
import MaticStone from "../../utils/MaticStone.json";
// @ts-ignore
import Web3 from "web3";

const Carousel = () => {
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState();
  const [ingredients, setIngredients] = useState([]);

  // @ts-ignore
  let provider = window.ethereum;

  useEffect(() => {
    if (provider) {
      console.log("MetaMask detected!");
      const web3 = new Web3(provider);
      provider.on("accountsChanged", () => {
        window.location.reload();
      });
      setContract(
        new web3.eth.Contract(
          MaticStone.abi,
          "0x212c2E0A66E3a28D9D37D18a390883bEe2c783E6"
        )
      );

      provider.request({ method: "eth_requestAccounts" }).then((res) => {
        // Return the address of the wallet
        console.log(res);
        setUserAddress(res[0]);
      });
    } else {
      alert("Install metamask extension!");
      window.location.href = "https://metamask.io/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userAddress !== "" && contract !== undefined) {
      // @ts-ignore
      contract.methods
        .balanceOf(userAddress)
        .call({ from: userAddress })
        .then((res) => {
          if (res < 30) window.location.href = "/";
        });
      // Send to home page if no cards!
      fetcher(userAddress, contract).then((res) => {
        setIngredients(res);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, userAddress]);

  return (
    <Fragment>
      <div>
        <Header address={userAddress} />
      </div>
      <div className="row-lm backdrop">
        {loading ? (
          <img src={Loader} alt="Loading gif" className="center" />
        ) : (
          <CarouselCards items={ingredients} />
        )}
      </div>
    </Fragment>
  );
};

export default Carousel;
