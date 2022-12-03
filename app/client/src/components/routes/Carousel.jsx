import React from "react";
import { Fragment, useEffect, useState } from "react";
import { fetcher } from "../../utils/retriever";
import Loader from "../ui/gifs/loader.gif";
import Header from "../ui/Header";
import CarouselCards from "../ui/CarouselCards";
// @ts-ignore
import MaticStone from "../../utils/data/MaticStone.json";
// @ts-ignore
import Web3 from "web3";

/**
 * Carousel component to display the carousel page.
 * @returns JSX react component element
 */
const Carousel = () => {
  const [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState();
  const [ingredients, setIngredients] = useState([]);

  // @ts-ignore
  let provider = window.ethereum;

  /**
   * Use effect to check if MetaMask is installed,
   * set user address and contract state.
   */
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
        setUserAddress(res[0]);
      });
    } else {
      alert("Install MetaMask extension!");
      window.location.href = process.env.REACT_APP_HOMEPAGE;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Use effect to check if carousel page requirements are met in order
   * to display all of a user's cards or send them back to the homepage.
   */
  useEffect(() => {
    if (userAddress !== "" && contract !== undefined) {
      // @ts-ignore
      contract.methods
        .balanceOf(userAddress)
        .call({ from: userAddress })
        .then((res) => {
          if (res < 30) window.location.href = "/";
        });
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
