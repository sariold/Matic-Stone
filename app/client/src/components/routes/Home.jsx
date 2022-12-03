import { Fragment, useEffect, useState } from "react";
import Loader from "../ui/gifs/loader.gif";
import Header from "../ui/Header";
import ipfs from "../../utils/data/ipfs";
// @ts-ignore
import Web3 from "web3";
// @ts-ignore
import MaticStone from "../../utils/data/MaticStone.json";

/**
 * Homepage component to display the homepage with all
 * of the important page links.
 * @returns JSX react component element
 */
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const [contract, setContract] = useState();

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

  /**
   * Create an array of X amount of URIs from the IPFS pool.
   * @param {*} x
   * @returns
   */
  const createX = (x) => {
    var uris = [];
    for (let i = 0; i < x; i++) {
      uris.push(ipfs.pool.sort(() => Math.random() - 0.5)[0]);
    }
    return uris;
  };

  /**
   * Contract call to multi mint a set of NFTs.
   */
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

  /**
   * Contract call to get the balance of the user.
   * @returns Balance of the user
   */
  const getBalance = () => {
    // @ts-ignore
    let bal = contract.methods
      .balanceOf(userAddress)
      .call({ from: userAddress });
    return bal;
  };

  /**
   * Check how many tokens a player has and determine if they can play.
   */
  const playGame = async () => {
    if ((await getBalance()) >= 30) window.location.href = "#/Game";
    else alert("You must at least have 30 MaticStone tokens to play!");
  };

  /**
   * Check how many tokens a player has and determine if they can
   * view their card collection.
   */
  const carousel = async () => {
    if ((await getBalance()) >= 30) window.location.href = "#/Carousel";
    else alert("You must at least have 30 MaticStone tokens to view carousel!");
  };

  return (
    <Fragment>
      <div className="backdrop text-center homepage">
        <Header address={userAddress} />
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
              <button
                className={"btn btn-success m-4"}
                onClick={() => {
                  window.location.href = "#/Tutorial";
                }}
              >
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
