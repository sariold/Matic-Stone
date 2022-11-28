import { Fragment, useEffect, useState } from "react";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import MaticStone from "../../utils/MaticStone.json";

import Loader from "../ui/loader.gif";

import Header from "../ui/Header";
import ipfs from "../../utils/ipfs";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState("");

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
      let meta_url = "https://metamask.io/";
      window.open(meta_url, "_blank") || window.location.replace(meta_url);
    }

    // console.log(ipfs.pool.sort(() => Math.random() - 0.5)[0]);
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

  const createX = (x) => {
    var uris = [];
    for (let i = 0; i < x; i++) {
      uris.push(ipfs.pool.sort(() => Math.random() - 0.5)[0]);
    }
    return uris;
  };

  const mint = async () => {
    let uris = createX(30);
    console.log(uris);
    setLoading(true);
    // @ts-ignore
    contract.methods
      .mulitMint(userAddress, uris)
      .send({ from: userAddress })
      .then(() => setLoading(false))
      .catch((e) => console.log(e))
      .then(() => setLoading(false));
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
    if ((await getBalance()) >= 30) window.location.href = "#/Game";
    else alert("You must at least have 30 MaticStone tokens to play!");
  };

  const carousel = async () => {
    if ((await getBalance()) >= 30) window.location.href = "#/Carousel";
    else alert("You must at least have 30 MaticStone tokens to view carousel!");
  };

  return (
    <Fragment>
      <div className="backdrop text-center homepage">
        <Header />
        {loading ? (
          <img src={Loader} alt="Loading Gif" />
        ) : (
          <div
            className="background"
            style={{
              backgroundImage:
                "url(" +
                process.env.REACT_APP_HOMEPAGE +
                "assets/Background.jpg)",
            }}
          >
            <div className="row-lm">
              <button className={"btn btn-success m-4"} onClick={() => {}}>
                Tutorial
              </button>
            </div>
            <div className="row-lm">
              <button
                // @ts-ignore
                style={{ pointerEvents: userAddress ? "" : "none" }}
                className={
                  userAddress ? "btn btn-success m-4" : "btn btn-danger m-4"
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
                  userAddress ? "btn btn-success m-4" : "btn btn-danger m-4"
                }
                onClick={carousel}
              >
                Card Carousel
              </button>
            </div>
            <div className="row-lm">
              <button
                // @ts-ignore
                style={{ pointerEvents: userAddress ? "" : "none" }}
                className={
                  userAddress ? "btn btn-success m-4" : "btn btn-danger m-4"
                }
                // onClick={fetcher}
                onClick={playGame}
              >
                Play Game
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
