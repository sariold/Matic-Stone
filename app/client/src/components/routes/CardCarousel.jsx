import React from "react";
import { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Loader from "../ui/loader.gif";

import Header from "../ui/Header";
// @ts-ignore
import { Carousel } from "react-responsive-carousel";
// @ts-ignore
import MaticStone from "../../utils/MaticStone.json";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import axios from "axios";

const CardCarousel = () => {
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
      // const networkId = await web3.eth.net.getId();
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
        .then((res) => console.log(res));
      fetcher().then(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, userAddress]);

  const getBalance = () => {
    // @ts-ignore
    return contract.methods.balanceOf(userAddress).call({ from: userAddress });
  };

  const getTokenID = (index) => {
    // @ts-ignore
    return contract.methods
      .tokenOfOwnerByIndex(userAddress, index)
      .call({ from: userAddress });
  };

  const getTokenURI = (id) => {
    // @ts-ignore
    return contract.methods.tokenURI(id).call({ from: userAddress });
  };

  const getTokens = async () => {
    let arr = [];
    let balance = await getBalance();

    for (let i = 0; i < balance; i++) {
      let tokenID = await getTokenID(i);
      let tokenURI = await getTokenURI(tokenID);
      arr.push(tokenURI);
    }
    return arr;
  };

  const retrieveJSON = async (uri) => {
    let res = axios.get(`https://ipfs.io/ipfs/${uri}`).then((resp) => {
      let attributes = resp.data["attributes"];
      let name = attributes[1]["value"];
      let mana = attributes[2]["value"];
      let damage = attributes[3]["value"];
      let health = attributes[4]["value"];
      let c = [name, mana, damage, health];
      return c;
    });
    return res;
  };

  const fetcher = async () => {
    let arr = await getTokens();
    let creatures = [];
    for (let i = 0; i < arr.length; i++) {
      let uri = arr[i];
      let c = await retrieveJSON(uri);
      console.log(c);
      creatures.push(c);
    }
    setIngredients(creatures);
  };

  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div className="row-lm backdrop">
        {loading ? (
          <img src={Loader} alt="Loading gif" className="center" />
        ) : (
          <Carousel
            autplay
            useKeyboardArrows={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            emulateTouch={true}
          >
            {ingredients.map((c) => (
              <div>
                <img
                  alt=""
                  src={
                    process.env.REACT_APP_HOMEPAGE +
                    "assets/creatures/" +
                    c[0] +
                    ".png"
                  }
                />
                <div className="carousel-badge">
                  <p>{"Damage: " + c[2] + " / Health: " + c[3]}</p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </Fragment>
  );
};

export default CardCarousel;
