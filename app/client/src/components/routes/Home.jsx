import { Fragment, useEffect, useState } from "react";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import MaticStone from "../../utils/MaticStone.json";
// @ts-ignore
import axios from "axios";

import Button from "../ui/Button";
import Header from "../ui/Header";
import ipfs from "../../utils/ipfs";

const Home = () => {
  const [userAddress, setUserAddress] = useState("");
  const [initialized, setInitialized] = useState(false);

  const [contract, setContract] = useState();
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
    }

    // console.log(ipfs.pool.sort(() => Math.random() - 0.5)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userAddress !== "" && initialized && contract !== undefined) {
      // @ts-ignore
      contract.methods
        .balanceOf(userAddress)
        .call({ from: userAddress })
        .then((res) => console.log(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, initialized]);

  const create30 = () => {
    var uris = [];
    for (let i = 0; i < 30; i++) {
      uris.push(ipfs.pool.sort(() => Math.random() - 0.5)[0]);
    }
    return uris;
  };

  const mint = () => {
    let uris = create30();
    console.log(uris);
    // @ts-ignore
    contract.methods
      .mulitMint(userAddress, uris)
      .send({ from: userAddress })
      .catch((e) => console.log(e));
  };

  const getBalance = () => {
    // @ts-ignore
    let bal = contract.methods
      .balanceOf(userAddress)
      .call({ from: userAddress });
    console.log(bal);
    return bal;
  };

  // const getTokenID = (index) => {
  //   // @ts-ignore
  //   return contract.methods
  //     .tokenOfOwnerByIndex(userAddress, index)
  //     .call({ from: userAddress });
  // };

  // const getTokenURI = (id) => {
  //   // @ts-ignore
  //   return contract.methods.tokenURI(id).call({ from: userAddress });
  // };

  // const getTokens = async () => {
  //   let arr = [];
  //   let balance = await getBalance();
  //   console.log(balance);

  //   for (let i = 0; i < balance; i++) {
  //     // console.log(i);
  //     let tokenID = await getTokenID(i);
  //     // console.log(tokenID);
  //     let tokenURI = await getTokenURI(tokenID);
  //     // console.log(tokenURI);
  //     arr.push(tokenURI);
  //   }
  //   return arr;
  // };

  const playGame = async () => {
    if ((await getBalance()) >= 30) window.location.href = "/Game";
    else alert("You must at least have 30 MaticStone tokens to play!");
  };

  const carousel = async () => {
    if ((await getBalance()) >= 30) window.location.href = "/Carousel";
    else alert("You must at least have 30 MaticStone tokens to view carousel!");
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
              // @ts-ignore
              style={{ pointerEvents: userAddress ? "" : "none" }}
              className={
                userAddress ? "btn btn-primary m-4" : "btn btn-danger m-4"
              }
              onClick={mint}
            >
              Mint Cards
            </button>
          </div>
          <div className="row-lm">
            <button
              // @ts-ignore
              style={{ pointerEvents: userAddress ? "" : "none" }}
              className={
                userAddress ? "btn btn-primary m-4" : "btn btn-danger m-4"
              }
              // onClick={fetcher}
              onClick={playGame}
            >
              Play Game
            </button>
          </div>
          <div className="row-lm">
            <Button
              className={"btn-primary m-4"}
              text={"Tutorial"}
              path={"/"}
            />
          </div>
          <div className="row-lm">
            <button
              style={{ pointerEvents: userAddress ? "" : "none" }}
              className={
                userAddress ? "btn btn-primary m-4" : "btn btn-danger m-4"
              }
              onClick={carousel}
            >
              Card Carousel
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
